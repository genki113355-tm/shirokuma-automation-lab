import socket
import time

def send_mock_ping():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    payload = b"PING:FREQ=60.0:AMP=100.0:TS=" + str(time.time()).encode()
    sock.sendto(payload, ("127.0.0.1", 9000))
    print("[HIL Mock Sender] Sent mock sensor packet:", payload.decode())

if __name__ == "__main__":
    send_mock_ping()
