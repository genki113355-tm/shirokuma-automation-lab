import pytest
from data_processor import DataProcessor

@pytest.mark.parametrize("input_data, expected", [
    ([], 0),
    ([1, 2, 3], 6),
    ([10, -5, 5], 10),
    ([100] * 1000, 100000)
])
def test_process_data(input_data, expected):
    processor = DataProcessor()
    assert processor.process(input_data) == expected
