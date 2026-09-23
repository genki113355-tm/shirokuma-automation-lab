#include <pybind11/pybind11.h>
#include "sonar_filter.h"

namespace py = pybind11;

PYBIND11_MODULE(sonar_dsp, m) {
    py::class_<SonarFilter>(m, "SonarFilter")
        .def(py::init<double>(), py::arg("cutoff") = 60.0)
        .def("process", &SonarFilter::Process);
}
