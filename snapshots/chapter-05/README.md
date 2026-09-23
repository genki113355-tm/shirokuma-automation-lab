# Chapter 05: pybind11によるC++ Pythonモジュール化 (完成コード)
pybind11を使ってC++のSonarFilterクラスをPythonモジュール「sonar_dsp」として公開し、Pythonから直接呼び出します。

## 実行方法
```bash
cmake -B build
cmake --build build
python3 -c "import sonar_dsp; f = sonar_dsp.SonarFilter(60.0); print(f'Output: {f.process(100.0):.2f}')"
pytest tests/test_bindings.py
```
