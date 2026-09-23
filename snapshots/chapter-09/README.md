# Chapter 09: AddressSanitizer & Valgrind メモリ解析 (完成コード)
コンパイラフラグ -fsanitize=address と Valgrind を使って、目に見えないメモリリークや境界外アクセスを自動検知します。

## 実行方法
```bash
cmake -B build -DENABLE_ASAN=ON
cmake --build build
./build/sonar_asan_test  # メモリ破壊があれば即座にスタックトレースを表示して停止
```
