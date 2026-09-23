#include "data_processor.h"
#include <numeric>

int DataProcessor::process(const std::vector<int>& data) {
    return std::accumulate(data.begin(), data.end(), 0);
}
