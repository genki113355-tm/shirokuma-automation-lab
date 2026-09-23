#ifndef DATA_PROCESSOR_H
#define DATA_PROCESSOR_H

#include <vector>

class DataProcessor {
public:
    DataProcessor() = default;
    int process(const std::vector<int>& data);
};

#endif // DATA_PROCESSOR_H
