import pytest
import sonar_dsp

def test_sonar_filter_binding():
    f = sonar_dsp.SonarFilter(60.0)
    assert f.get_cutoff() == 60.0
    out = f.process(100.0)
    assert pytest.approx(out, rel=1e-2) == 45.23
