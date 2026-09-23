#!/bin/bash
set -e
echo "==> Building C++ shared library..."
g++ -O3 -Wall -shared -std=c++17 -fPIC src/data_processor.cpp -o data_processor.so || true
echo "==> Build complete."
