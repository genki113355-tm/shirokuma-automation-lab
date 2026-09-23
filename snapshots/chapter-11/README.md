# Chapter 11: UDP / HILシミュレーション自動テスト (完成コード)
実機ソナーハードウェアが手元になくても、UDPソケット通信で擬似センサパケットを生成・送受信して自動検証するテスト構成です。

## 実行方法
```bash
# ターミナル1: C++ UDP受信バイナリ
./build/sonar_receiver

# ターミナル2: Python 模擬送信スクリプト
python3 tests/mock_sonar_sender.py
```
