cmake_minimum_required(VERSION 3.16)
project(ShirokumaCompleteAutoLab CXX)
set(CMAKE_CXX_STANDARD 17)

# AddressSanitizer option
option(ENABLE_ASAN "Enable AddressSanitizer" OFF)
if(ENABLE_ASAN)
  add_compile_options(-fsanitize=address -fno-omit-frame-pointer -g)
  add_link_options(-fsanitize=address)
endif()

# Core static library
add_library(sonar_core src/sonar_filter.cpp)
target_include_directories(sonar_core PUBLIC src)

# pybind11 module
find_package(pybind11 QUIET)
if(pybind11_FOUND)
  pybind11_add_module(sonar_dsp src/bindings.cpp)
  target_link_libraries(sonar_dsp PRIVATE sonar_core)
endif()

# Testing
enable_testing()
add_executable(sonar_test tests/test_main.cpp)
target_link_libraries(sonar_test PRIVATE sonar_core)
add_test(NAME CoreUnitTest COMMAND sonar_test)
