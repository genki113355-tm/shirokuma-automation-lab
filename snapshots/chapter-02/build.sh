#!/bin/bash
set -e
echo "==> Running in Docker container..."
g++ -O3 -Wall src/data_processor.cpp -c -o data_processor.o
echo "==> Compiled successfully in isolated Linux container!"
pytest
