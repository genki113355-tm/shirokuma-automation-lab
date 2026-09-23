# Chapter 12: 自動テストシステム構築の実践 (完成統合版)
全12章で学んだDocker、CMake、GoogleTest、pybind11、NumPy、ASan、GitHub Actionsを結集した完全統合型プロジェクトです。

## ディレクトリ構成
- `src/`: C++ コアロジック (SonarFilter) および pybind11 バインディング
- `tests/`: GoogleTest 単体テスト & Python シナリオテスト
- `scripts/`: ワンコマンド実行パイプライン (`run_pipeline.sh`)
- `.github/workflows/`: CI/CD 定義ファイル
- `Dockerfile`: 再現可能な統一ビルド環境

## 実行方法
```bash
# 1. コンテナ内で全自動ビルド＆テスト
docker build -t shirokuma-complete .
docker run --rm shirokuma-complete

# 2. ローカルで直接実行する場合
./scripts/run_pipeline.sh
```
