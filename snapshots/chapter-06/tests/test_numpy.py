import numpy as np
import pytest
import sonar_dsp

def test_numpy_zero_copy_batch():
    data = np.linspace(10.0, 100.0, 10000, dtype=np.float64)
    processed = sonar_dsp.process_waveform(data, 60.0)
    assert len(processed) == 10000
    assert pytest.approx(processed[-1], rel=1e-2) == 45.23
