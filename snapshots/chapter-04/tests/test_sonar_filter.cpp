#include <gtest/gtest.h>
#include "sonar_filter.h"

TEST(SonarFilterTest, Initialization) {
    SonarFilter filter(60.0);
    EXPECT_DOUBLE_EQ(filter.GetCutoffFrequency(), 60.0);
}

TEST(SonarFilterTest, SignalAttenuation) {
    SonarFilter filter(60.0);
    double input = 100.0;
    double output = filter.Process(input);
    EXPECT_NEAR(output, 45.23, 0.05);
}
