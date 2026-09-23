#include <iostream>

void safe_function() {
    int* buffer = new int[50];
    buffer[0] = 123;
    delete[] buffer; // Properly freed
}

int main() {
    std::cout << "Running AddressSanitizer memory safety check..." << std::endl;
    safe_function();
    std::cout << "Clean execution without memory corruption." << std::endl;
    return 0;
}
