import os
import numpy as np
import pytest
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

def mock_sonar_filter(signal, cutoff):
    return signal * np.exp(-cutoff / 75.64)

@pytest.mark.parametrize("cutoff", [30.0, 60.0, 90.0, 120.0])
def test_generate_report(cutoff):
    os.makedirs("reports", exist_ok=True)
    t = np.linspace(0, 1, 500)
    raw = 100.0 * np.sin(2 * np.pi * 5 * t)
    filtered = mock_sonar_filter(raw, cutoff)

    plt.figure(figsize=(6, 3))
    plt.plot(t, raw, label="Input (100V)")
    plt.plot(t, filtered, label=f"Filtered ({cutoff}Hz)")
    plt.title(f"Sonar Filter Response (Cutoff={cutoff}Hz)")
    plt.legend()
    plt.savefig(f"reports/filter_cutoff_{int(cutoff)}.png")
    plt.close()

    assert np.max(filtered) < np.max(raw)
