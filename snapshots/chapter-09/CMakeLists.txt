cmake_minimum_required(VERSION 3.16)
project(SonarSanitizers CXX)
set(CMAKE_CXX_STANDARD 17)

option(ENABLE_ASAN "Enable AddressSanitizer" ON)
if(ENABLE_ASAN)
  add_compile_options(-fsanitize=address -fno-omit-frame-pointer -g)
  add_link_options(-fsanitize=address)
endif()

add_executable(sonar_asan_test src/main.cpp)
