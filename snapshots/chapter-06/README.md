# Chapter 06: NumPyゼロコピー連携 (完成コード)
pybind11の py::array_t を使い、数万件のテスト波形データをメモリコピーなし（ゼロコピー）でC++へ高速流し込みます。

## 実行方法
```bash
cmake -B build && cmake --build build
pytest tests/test_numpy.py
```
