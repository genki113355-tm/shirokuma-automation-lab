# Chapter 04: GoogleTestによるC++網羅テスト (完成コード)
GoogleTest (gtest) を導入し、EXPECT_NEARで浮動小数点の丸め誤差を許容しながら数理ロジックを検証します。

## 実行方法
```bash
cmake -B build
cmake --build build
./build/sonar_gtest
ctest --test-dir build --output-on-failure
```
