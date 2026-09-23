cmake_minimum_required(VERSION 3.16)
project(SonarGoogleTest CXX)
set(CMAKE_CXX_STANDARD 17)

include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/refs/tags/v1.14.0.zip
)
# For offline/local builds, find_package(GTest REQUIRED) can also be used
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

add_library(sonar_core src/sonar_filter.cpp)
target_include_directories(sonar_core PUBLIC src)

enable_testing()
add_executable(sonar_gtest tests/test_sonar_filter.cpp)
target_link_libraries(sonar_gtest PRIVATE sonar_core gtest_main)

include(GoogleTest)
gtest_discover_tests(sonar_gtest)
