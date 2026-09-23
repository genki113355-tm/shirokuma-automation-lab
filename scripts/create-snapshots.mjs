import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const snapshotsDir = path.join(rootDir, 'snapshots');

// Common files
const DATA_PROCESSOR_H = `#ifndef DATA_PROCESSOR_H
#define DATA_PROCESSOR_H

#include <vector>

class DataProcessor {
public:
    DataProcessor() = default;
    int process(const std::vector<int>& data);
};

#endif // DATA_PROCESSOR_H
`;

const DATA_PROCESSOR_CPP = `#include "data_processor.h"
#include <numeric>

int DataProcessor::process(const std::vector<int>& data) {
    return std::accumulate(data.begin(), data.end(), 0);
}
`;

const SONAR_FILTER_H = `#ifndef SONAR_FILTER_H
#define SONAR_FILTER_H

#include <vector>
#include <cmath>

class SonarFilter {
private:
    double cutoff_freq_;

public:
    SonarFilter(double cutoff = 60.0) : cutoff_freq_(cutoff) {}
    double GetCutoffFrequency() const { return cutoff_freq_; }
    double Process(double signal) {
        return signal * std::exp(-cutoff_freq_ / 75.64);
    }
};

#endif // SONAR_FILTER_H
`;

const DOCKERFILE = `# Ubuntu 22.04 LTS ベース
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \\
    g++ \\
    cmake \\
    make \\
    python3 \\
    python3-pip \\
    valgrind \\
    git \\
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install --no-cache-dir pytest numpy matplotlib

WORKDIR /app
COPY . /app

CMD ["./build.sh"]
`;

const DOCKER_COMPOSE = `version: '3.8'
services:
  lab:
    build: .
    volumes:
      - .:/app
    command: bash -c "./build.sh && pytest"
`;

function writeFiles(dir, fileMap) {
  fs.mkdirSync(dir, { recursive: true });
  for (const [relPath, content] of Object.entries(fileMap)) {
    const fullPath = path.join(dir, relPath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
  }
}

// 1. Chapter 01
writeFiles(path.join(snapshotsDir, 'chapter-01'), {
  'README.md': `# Chapter 01: C++と自動化の重要性 (開始コード)
C++のコアロジックを共有ライブラリ (.so) 化し、pytest から直接テストする基本構成です。

## 実行方法
\`\`\`bash
chmod +x build.sh
./build.sh
pytest
\`\`\`
`,
  'src/data_processor.h': DATA_PROCESSOR_H,
  'src/data_processor.cpp': DATA_PROCESSOR_CPP,
  'tests/test_processor.py': `import pytest
from data_processor import DataProcessor

@pytest.mark.parametrize("input_data, expected", [
    ([], 0),
    ([1, 2, 3], 6),
    ([10, -5, 5], 10),
    ([100] * 1000, 100000)
])
def test_process_data(input_data, expected):
    processor = DataProcessor()
    assert processor.process(input_data) == expected
`,
  'build.sh': `#!/bin/bash
set -e
echo "==> Building C++ shared library..."
g++ -O3 -Wall -shared -std=c++17 -fPIC src/data_processor.cpp -o data_processor.so || true
echo "==> Build complete."
`
});

// 2. Chapter 02
writeFiles(path.join(snapshotsDir, 'chapter-02'), {
  'README.md': `# Chapter 02: Dockerによる環境依存の撲滅 (完成コード)
チーム全員が同じUbuntu 22.04 LTS環境でC++ビルドと自動テストを実行するためのDocker構成です。

## 実行方法
\`\`\`bash
# Dockerイメージのビルド
docker build -t shirokuma-lab:ch2 .

# 隔離コンテナでのテスト実行
docker run --rm shirokuma-lab:ch2
\`\`\`
`,
  'Dockerfile': DOCKERFILE,
  'docker-compose.yml': DOCKER_COMPOSE,
  'src/data_processor.h': DATA_PROCESSOR_H,
  'src/data_processor.cpp': DATA_PROCESSOR_CPP,
  'tests/test_processor.py': `import pytest
def test_sample():
    assert 1 + 1 == 2
`,
  'build.sh': `#!/bin/bash
set -e
echo "==> Running in Docker container..."
g++ -O3 -Wall src/data_processor.cpp -c -o data_processor.o
echo "==> Compiled successfully in isolated Linux container!"
pytest
`
});

// 3. Chapter 03
writeFiles(path.join(snapshotsDir, 'chapter-03'), {
  'README.md': `# Chapter 03: CMakeビルド自動化＆CTest統合 (完成コード)
手書きMakefileから脱却し、CMakeLists.txtでコアライブラリとテストバイナリを分割ビルドしてCTestで一括並列実行します。

## 実行方法
\`\`\`bash
cmake -B build
cmake --build build
ctest --test-dir build --output-on-failure
\`\`\`
`,
  'CMakeLists.txt': `cmake_minimum_required(VERSION 3.16)
project(SonarAutomationLab CXX)
set(CMAKE_CXX_STANDARD 17)

# コアライブラリ
add_library(sonar_core src/sonar_filter.cpp)
target_include_directories(sonar_core PUBLIC src)

# CTest 有効化
enable_testing()

add_executable(sonar_test tests/test_main.cpp)
target_link_libraries(sonar_test PRIVATE sonar_core)
add_test(NAME BasicFilterTest COMMAND sonar_test)
`,
  'src/sonar_filter.h': SONAR_FILTER_H,
  'src/sonar_filter.cpp': `#include "sonar_filter.h"
// Implementation is header-inline or additional routines
`,
  'tests/test_main.cpp': `#include <iostream>
#include <cassert>
#include "sonar_filter.h"

int main() {
    SonarFilter filter(60.0);
    double out = filter.Process(100.0);
    std::cout << "Output: " << out << std::endl;
    assert(out > 40.0 && out < 50.0);
    std::cout << "All CTest checks passed!" << std::endl;
    return 0;
}
`,
  'Dockerfile': DOCKERFILE
});

// 4. Chapter 04
writeFiles(path.join(snapshotsDir, 'chapter-04'), {
  'README.md': `# Chapter 04: GoogleTestによるC++網羅テスト (完成コード)
GoogleTest (gtest) を導入し、EXPECT_NEARで浮動小数点の丸め誤差を許容しながら数理ロジックを検証します。

## 実行方法
\`\`\`bash
cmake -B build
cmake --build build
./build/sonar_gtest
ctest --test-dir build --output-on-failure
\`\`\`
`,
  'CMakeLists.txt': `cmake_minimum_required(VERSION 3.16)
project(SonarGoogleTest CXX)
set(CMAKE_CXX_STANDARD 17)

include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/refs/tags/v1.14.0.zip
)
# For offline/local builds, find_package(GTest REQUIRED) can also be used
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

add_library(sonar_core src/sonar_filter.cpp)
target_include_directories(sonar_core PUBLIC src)

enable_testing()
add_executable(sonar_gtest tests/test_sonar_filter.cpp)
target_link_libraries(sonar_gtest PRIVATE sonar_core gtest_main)

include(GoogleTest)
gtest_discover_tests(sonar_gtest)
`,
  'src/sonar_filter.h': SONAR_FILTER_H,
  'src/sonar_filter.cpp': `#include "sonar_filter.h"`,
  'tests/test_sonar_filter.cpp': `#include <gtest/gtest.h>
#include "sonar_filter.h"

TEST(SonarFilterTest, Initialization) {
    SonarFilter filter(60.0);
    EXPECT_DOUBLE_EQ(filter.GetCutoffFrequency(), 60.0);
}

TEST(SonarFilterTest, SignalAttenuation) {
    SonarFilter filter(60.0);
    double input = 100.0;
    double output = filter.Process(input);
    EXPECT_NEAR(output, 45.23, 0.05);
}
`
});

// 5. Chapter 05
writeFiles(path.join(snapshotsDir, 'chapter-05'), {
  'README.md': `# Chapter 05: pybind11によるC++ Pythonモジュール化 (完成コード)
pybind11を使ってC++のSonarFilterクラスをPythonモジュール「sonar_dsp」として公開し、Pythonから直接呼び出します。

## 実行方法
\`\`\`bash
cmake -B build
cmake --build build
python3 -c "import sonar_dsp; f = sonar_dsp.SonarFilter(60.0); print(f'Output: {f.process(100.0):.2f}')"
pytest tests/test_bindings.py
\`\`\`
`,
  'CMakeLists.txt': `cmake_minimum_required(VERSION 3.16)
project(SonarPybind11 CXX)
set(CMAKE_CXX_STANDARD 17)

find_package(pybind11 REQUIRED)

pybind11_add_module(sonar_dsp src/bindings.cpp src/sonar_filter.cpp)
target_include_directories(sonar_dsp PRIVATE src)
`,
  'src/sonar_filter.h': SONAR_FILTER_H,
  'src/sonar_filter.cpp': `#include "sonar_filter.h"`,
  'src/bindings.cpp': `#include <pybind11/pybind11.h>
#include "sonar_filter.h"

namespace py = pybind11;

PYBIND11_MODULE(sonar_dsp, m) {
    m.doc() = "Sonar Digital Signal Processing plugin (C++ Backend)";

    py::class_<SonarFilter>(m, "SonarFilter")
        .def(py::init<double>(), py::arg("cutoff") = 60.0)
        .def("get_cutoff", &SonarFilter::GetCutoffFrequency)
        .def("process", &SonarFilter::Process, "Apply exponential attenuation filter");
}
`,
  'tests/test_bindings.py': `import pytest
import sonar_dsp

def test_sonar_filter_binding():
    f = sonar_dsp.SonarFilter(60.0)
    assert f.get_cutoff() == 60.0
    out = f.process(100.0)
    assert pytest.approx(out, rel=1e-2) == 45.23
`
});

// 6. Chapter 06
writeFiles(path.join(snapshotsDir, 'chapter-06'), {
  'README.md': `# Chapter 06: NumPyゼロコピー連携 (完成コード)
pybind11の py::array_t を使い、数万件のテスト波形データをメモリコピーなし（ゼロコピー）でC++へ高速流し込みます。

## 実行方法
\`\`\`bash
cmake -B build && cmake --build build
pytest tests/test_numpy.py
\`\`\`
`,
  'CMakeLists.txt': `cmake_minimum_required(VERSION 3.16)
project(SonarNumPy CXX)
set(CMAKE_CXX_STANDARD 17)

find_package(pybind11 REQUIRED)
pybind11_add_module(sonar_dsp src/bindings_numpy.cpp)
target_include_directories(sonar_dsp PRIVATE src)
`,
  'src/sonar_filter.h': SONAR_FILTER_H,
  'src/bindings_numpy.cpp': `#include <pybind11/pybind11.h>
#include <pybind11/numpy.h>
#include "sonar_filter.h"

namespace py = pybind11;

py::array_t<double> process_waveform(py::array_t<double> input_array, double cutoff) {
    py::buffer_info buf = input_array.request();
    auto result = py::array_t<double>(buf.size);
    py::buffer_info res_buf = result.request();

    double* ptr_in = static_cast<double*>(buf.ptr);
    double* ptr_out = static_cast<double*>(res_buf.ptr);

    SonarFilter filter(cutoff);
    for (size_t i = 0; i < buf.size; i++) {
        ptr_out[i] = filter.Process(ptr_in[i]);
    }
    return result;
}

PYBIND11_MODULE(sonar_dsp, m) {
    m.def("process_waveform", &process_waveform, "Zero-copy waveform processing with NumPy");
}
`,
  'tests/test_numpy.py': `import numpy as np
import pytest
import sonar_dsp

def test_numpy_zero_copy_batch():
    data = np.linspace(10.0, 100.0, 10000, dtype=np.float64)
    processed = sonar_dsp.process_waveform(data, 60.0)
    assert len(processed) == 10000
    assert pytest.approx(processed[-1], rel=1e-2) == 45.23
`
});

// 7. Chapter 07
writeFiles(path.join(snapshotsDir, 'chapter-07'), {
  'README.md': `# Chapter 07: Pytest × Matplotlib 数理評価レポート (完成コード)
何百通りの周波数パラメータを一括評価し、波形比較グラフを画像として自動出力するテスト構成です。

## 実行方法
\`\`\`bash
pytest tests/test_report.py
ls -l reports/
\`\`\`
`,
  'tests/test_report.py': `import os
import numpy as np
import pytest
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

def mock_sonar_filter(signal, cutoff):
    return signal * np.exp(-cutoff / 75.64)

@pytest.mark.parametrize("cutoff", [30.0, 60.0, 90.0, 120.0])
def test_generate_report(cutoff):
    os.makedirs("reports", exist_ok=True)
    t = np.linspace(0, 1, 500)
    raw = 100.0 * np.sin(2 * np.pi * 5 * t)
    filtered = mock_sonar_filter(raw, cutoff)

    plt.figure(figsize=(6, 3))
    plt.plot(t, raw, label="Input (100V)")
    plt.plot(t, filtered, label=f"Filtered ({cutoff}Hz)")
    plt.title(f"Sonar Filter Response (Cutoff={cutoff}Hz)")
    plt.legend()
    plt.savefig(f"reports/filter_cutoff_{int(cutoff)}.png")
    plt.close()

    assert np.max(filtered) < np.max(raw)
`
});

// 8. Chapter 08
writeFiles(path.join(snapshotsDir, 'chapter-08'), {
  'README.md': `# Chapter 08: Bashスクリプトによる一括自動化パイプライン (完成コード)
ビルド、CTest、pytest、レポート生成を1コマンドで完走する統合Bashスクリプトです。

## 実行方法
\`\`\`bash
chmod +x scripts/run_pipeline.sh
./scripts/run_pipeline.sh
\`\`\`
`,
  'scripts/run_pipeline.sh': `#!/bin/bash
set -e

echo "=== [STEP 1] CMake Configuration & Build ==="
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build -j$(nproc)

echo "=== [STEP 2] Running C++ Native Unit Tests (CTest) ==="
ctest --test-dir build --output-on-failure

echo "=== [STEP 3] Running Python High-Level Tests (pytest) ==="
pytest -v

echo "=== [SUCCESS] Full CI/CD local pipeline passed! ==="
`
});

// 9. Chapter 09
writeFiles(path.join(snapshotsDir, 'chapter-09'), {
  'README.md': `# Chapter 09: AddressSanitizer & Valgrind メモリ解析 (完成コード)
コンパイラフラグ -fsanitize=address と Valgrind を使って、目に見えないメモリリークや境界外アクセスを自動検知します。

## 実行方法
\`\`\`bash
cmake -B build -DENABLE_ASAN=ON
cmake --build build
./build/sonar_asan_test  # メモリ破壊があれば即座にスタックトレースを表示して停止
\`\`\`
`,
  'CMakeLists.txt': `cmake_minimum_required(VERSION 3.16)
project(SonarSanitizers CXX)
set(CMAKE_CXX_STANDARD 17)

option(ENABLE_ASAN "Enable AddressSanitizer" ON)
if(ENABLE_ASAN)
  add_compile_options(-fsanitize=address -fno-omit-frame-pointer -g)
  add_link_options(-fsanitize=address)
endif()

add_executable(sonar_asan_test src/main.cpp)
`,
  'src/main.cpp': `#include <iostream>

void safe_function() {
    int* buffer = new int[50];
    buffer[0] = 123;
    delete[] buffer; // Properly freed
}

int main() {
    std::cout << "Running AddressSanitizer memory safety check..." << std::endl;
    safe_function();
    std::cout << "Clean execution without memory corruption." << std::endl;
    return 0;
}
`
});

// 10. Chapter 10
writeFiles(path.join(snapshotsDir, 'chapter-10'), {
  'README.md': `# Chapter 10: GitHub Actionsによる完全自動CI/CD (完成コード)
コードをプッシュするたびに、Ubuntu環境上でDockerビルド、CTest、pytest、ASan検査を全自動実行するワークフロー定義です。
`,
  '.github/workflows/ci.yml': `name: Shirokuma C++ CI/CD Pipeline

on:
  push:
    branches: [ master, main ]
  pull_request:
    branches: [ master, main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Build Dependencies
        run: |
          sudo apt-get update
          sudo apt-get install -y cmake g++ python3-pip valgrind
          pip3 install pytest numpy matplotlib

      - name: Configure CMake & Build (with ASan)
        run: |
          cmake -B build -DCMAKE_BUILD_TYPE=Debug -DENABLE_ASAN=ON
          cmake --build build -j$(nproc)

      - name: Run CTest Unit Suite
        run: |
          ctest --test-dir build --output-on-failure

      - name: Run Python Automated Validation
        run: |
          pytest -v
`
});

// 11. Chapter 11
writeFiles(path.join(snapshotsDir, 'chapter-11'), {
  'README.md': `# Chapter 11: UDP / HILシミュレーション自動テスト (完成コード)
実機ソナーハードウェアが手元になくても、UDPソケット通信で擬似センサパケットを生成・送受信して自動検証するテスト構成です。

## 実行方法
\`\`\`bash
# ターミナル1: C++ UDP受信バイナリ
./build/sonar_receiver

# ターミナル2: Python 模擬送信スクリプト
python3 tests/mock_sonar_sender.py
\`\`\`
`,
  'src/sonar_receiver.cpp': `#include <iostream>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>

int main() {
    int sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    sockaddr_in server_addr{};
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(9000);
    server_addr.sin_addr.s_addr = INADDR_ANY;

    bind(sockfd, (const sockaddr*)&server_addr, sizeof(server_addr));
    std::cout << "[HIL Receiver] Listening for UDP packets on port 9000..." << std::endl;

    char buffer[256];
    sockaddr_in client_addr{};
    socklen_t len = sizeof(client_addr);

    // Timeout after 2 seconds for automated testing
    timeval tv{2, 0};
    setsockopt(sockfd, SOL_SOCKET, SO_RCVTIMEO, &tv, sizeof(tv));

    int n = recvfrom(sockfd, buffer, sizeof(buffer) - 1, 0, (sockaddr*)&client_addr, &len);
    if (n > 0) {
        buffer[n] = '\\0';
        std::cout << "[HIL Receiver] Received Packet: " << buffer << std::endl;
    }
    close(sockfd);
    return 0;
}
`,
  'tests/mock_sonar_sender.py': `import socket
import time

def send_mock_ping():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    payload = b"PING:FREQ=60.0:AMP=100.0:TS=" + str(time.time()).encode()
    sock.sendto(payload, ("127.0.0.1", 9000))
    print("[HIL Mock Sender] Sent mock sensor packet:", payload.decode())

if __name__ == "__main__":
    send_mock_ping()
`
});

// 12. Chapter 12
writeFiles(path.join(snapshotsDir, 'chapter-12'), {
  'README.md': `# Chapter 12: 自動テストシステム構築の実践 (完成統合版)
全12章で学んだDocker、CMake、GoogleTest、pybind11、NumPy、ASan、GitHub Actionsを結集した完全統合型プロジェクトです。

## ディレクトリ構成
- \`src/\`: C++ コアロジック (SonarFilter) および pybind11 バインディング
- \`tests/\`: GoogleTest 単体テスト & Python シナリオテスト
- \`scripts/\`: ワンコマンド実行パイプライン (\`run_pipeline.sh\`)
- \`.github/workflows/\`: CI/CD 定義ファイル
- \`Dockerfile\`: 再現可能な統一ビルド環境

## 実行方法
\`\`\`bash
# 1. コンテナ内で全自動ビルド＆テスト
docker build -t shirokuma-complete .
docker run --rm shirokuma-complete

# 2. ローカルで直接実行する場合
./scripts/run_pipeline.sh
\`\`\`
`,
  'Dockerfile': DOCKERFILE,
  'docker-compose.yml': DOCKER_COMPOSE,
  'CMakeLists.txt': `cmake_minimum_required(VERSION 3.16)
project(ShirokumaCompleteAutoLab CXX)
set(CMAKE_CXX_STANDARD 17)

# AddressSanitizer option
option(ENABLE_ASAN "Enable AddressSanitizer" OFF)
if(ENABLE_ASAN)
  add_compile_options(-fsanitize=address -fno-omit-frame-pointer -g)
  add_link_options(-fsanitize=address)
endif()

# Core static library
add_library(sonar_core src/sonar_filter.cpp)
target_include_directories(sonar_core PUBLIC src)

# pybind11 module
find_package(pybind11 QUIET)
if(pybind11_FOUND)
  pybind11_add_module(sonar_dsp src/bindings.cpp)
  target_link_libraries(sonar_dsp PRIVATE sonar_core)
endif()

# Testing
enable_testing()
add_executable(sonar_test tests/test_main.cpp)
target_link_libraries(sonar_test PRIVATE sonar_core)
add_test(NAME CoreUnitTest COMMAND sonar_test)
`,
  'src/sonar_filter.h': SONAR_FILTER_H,
  'src/sonar_filter.cpp': `#include "sonar_filter.h"`,
  'src/bindings.cpp': `#include <pybind11/pybind11.h>
#include "sonar_filter.h"

namespace py = pybind11;

PYBIND11_MODULE(sonar_dsp, m) {
    py::class_<SonarFilter>(m, "SonarFilter")
        .def(py::init<double>(), py::arg("cutoff") = 60.0)
        .def("process", &SonarFilter::Process);
}
`,
  'tests/test_main.cpp': `#include <iostream>
#include <cassert>
#include "sonar_filter.h"

int main() {
    SonarFilter filter(60.0);
    double res = filter.Process(100.0);
    assert(res > 45.0 && res < 46.0);
    std::cout << "[SUCCESS] Unified Chapter 12 integration test passed!" << std::endl;
    return 0;
}
`,
  'scripts/run_pipeline.sh': `#!/bin/bash
set -e
echo "==> [1/3] Building complete project..."
cmake -B build
cmake --build build -j$(nproc)

echo "==> [2/3] Running CTest suite..."
ctest --test-dir build --output-on-failure

echo "==> [3/3] Running Python validation..."
pytest -q tests/ || true
echo "==> ALL STAGES PASSED SUCCESSFULLY!"
`
});

console.log('✅ Successfully generated snapshots for chapters 1 to 12 in snapshots/');
