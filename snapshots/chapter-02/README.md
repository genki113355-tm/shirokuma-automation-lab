# Chapter 02: Dockerによる環境依存の撲滅 (完成コード)
チーム全員が同じUbuntu 22.04 LTS環境でC++ビルドと自動テストを実行するためのDocker構成です。

## 実行方法
```bash
# Dockerイメージのビルド
docker build -t shirokuma-lab:ch2 .

# 隔離コンテナでのテスト実行
docker run --rm shirokuma-lab:ch2
```
