#!/bin/bash
set -e

echo "=== [STEP 1] CMake Configuration & Build ==="
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build -j$(nproc)

echo "=== [STEP 2] Running C++ Native Unit Tests (CTest) ==="
ctest --test-dir build --output-on-failure

echo "=== [STEP 3] Running Python High-Level Tests (pytest) ==="
pytest -v

echo "=== [SUCCESS] Full CI/CD local pipeline passed! ==="
