#include <pybind11/pybind11.h>
#include <pybind11/numpy.h>
#include "sonar_filter.h"

namespace py = pybind11;

py::array_t<double> process_waveform(py::array_t<double> input_array, double cutoff) {
    py::buffer_info buf = input_array.request();
    auto result = py::array_t<double>(buf.size);
    py::buffer_info res_buf = result.request();

    double* ptr_in = static_cast<double*>(buf.ptr);
    double* ptr_out = static_cast<double*>(res_buf.ptr);

    SonarFilter filter(cutoff);
    for (size_t i = 0; i < buf.size; i++) {
        ptr_out[i] = filter.Process(ptr_in[i]);
    }
    return result;
}

PYBIND11_MODULE(sonar_dsp, m) {
    m.def("process_waveform", &process_waveform, "Zero-copy waveform processing with NumPy");
}
