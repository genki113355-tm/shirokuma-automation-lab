#include <iostream>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>

int main() {
    int sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    sockaddr_in server_addr{};
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(9000);
    server_addr.sin_addr.s_addr = INADDR_ANY;

    bind(sockfd, (const sockaddr*)&server_addr, sizeof(server_addr));
    std::cout << "[HIL Receiver] Listening for UDP packets on port 9000..." << std::endl;

    char buffer[256];
    sockaddr_in client_addr{};
    socklen_t len = sizeof(client_addr);

    // Timeout after 2 seconds for automated testing
    timeval tv{2, 0};
    setsockopt(sockfd, SOL_SOCKET, SO_RCVTIMEO, &tv, sizeof(tv));

    int n = recvfrom(sockfd, buffer, sizeof(buffer) - 1, 0, (sockaddr*)&client_addr, &len);
    if (n > 0) {
        buffer[n] = '\0';
        std::cout << "[HIL Receiver] Received Packet: " << buffer << std::endl;
    }
    close(sockfd);
    return 0;
}
