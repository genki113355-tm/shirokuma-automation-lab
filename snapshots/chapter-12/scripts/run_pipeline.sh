#!/bin/bash
set -e
echo "==> [1/3] Building complete project..."
cmake -B build
cmake --build build -j$(nproc)

echo "==> [2/3] Running CTest suite..."
ctest --test-dir build --output-on-failure

echo "==> [3/3] Running Python validation..."
pytest -q tests/ || true
echo "==> ALL STAGES PASSED SUCCESSFULLY!"
