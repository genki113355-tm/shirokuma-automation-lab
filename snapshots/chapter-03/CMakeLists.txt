cmake_minimum_required(VERSION 3.16)
project(SonarAutomationLab CXX)
set(CMAKE_CXX_STANDARD 17)

# コアライブラリ
add_library(sonar_core src/sonar_filter.cpp)
target_include_directories(sonar_core PUBLIC src)

# CTest 有効化
enable_testing()

add_executable(sonar_test tests/test_main.cpp)
target_link_libraries(sonar_test PRIVATE sonar_core)
add_test(NAME BasicFilterTest COMMAND sonar_test)
