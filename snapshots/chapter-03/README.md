# Chapter 03: CMakeビルド自動化＆CTest統合 (完成コード)
手書きMakefileから脱却し、CMakeLists.txtでコアライブラリとテストバイナリを分割ビルドしてCTestで一括並列実行します。

## 実行方法
```bash
cmake -B build
cmake --build build
ctest --test-dir build --output-on-failure
```
