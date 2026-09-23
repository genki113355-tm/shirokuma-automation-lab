#include <iostream>
#include <cassert>
#include "sonar_filter.h"

int main() {
    SonarFilter filter(60.0);
    double out = filter.Process(100.0);
    std::cout << "Output: " << out << std::endl;
    assert(out > 40.0 && out < 50.0);
    std::cout << "All CTest checks passed!" << std::endl;
    return 0;
}
