cmake_minimum_required(VERSION 3.16)
project(SonarPybind11 CXX)
set(CMAKE_CXX_STANDARD 17)

find_package(pybind11 REQUIRED)

pybind11_add_module(sonar_dsp src/bindings.cpp src/sonar_filter.cpp)
target_include_directories(sonar_dsp PRIVATE src)
