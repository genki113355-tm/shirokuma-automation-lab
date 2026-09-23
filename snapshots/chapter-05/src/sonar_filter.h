#ifndef SONAR_FILTER_H
#define SONAR_FILTER_H

#include <vector>
#include <cmath>

class SonarFilter {
private:
    double cutoff_freq_;

public:
    SonarFilter(double cutoff = 60.0) : cutoff_freq_(cutoff) {}
    double GetCutoffFrequency() const { return cutoff_freq_; }
    double Process(double signal) {
        return signal * std::exp(-cutoff_freq_ / 75.64);
    }
};

#endif // SONAR_FILTER_H
