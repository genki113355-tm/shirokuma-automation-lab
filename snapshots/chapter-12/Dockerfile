# Ubuntu 22.04 LTS ベース
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    g++ \
    cmake \
    make \
    python3 \
    python3-pip \
    valgrind \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install --no-cache-dir pytest numpy matplotlib

WORKDIR /app
COPY . /app

CMD ["./build.sh"]
