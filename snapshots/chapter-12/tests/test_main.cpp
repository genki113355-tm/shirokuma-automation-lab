#include <iostream>
#include <cassert>
#include "sonar_filter.h"

int main() {
    SonarFilter filter(60.0);
    double res = filter.Process(100.0);
    assert(res > 45.0 && res < 46.0);
    std::cout << "[SUCCESS] Unified Chapter 12 integration test passed!" << std::endl;
    return 0;
}
