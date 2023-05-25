import guardNumber from './guardNumber';

describe('guardNumber function', () => {
  const TEST_FALLBACK = 1234;

  test.each([
    ['1', 1],
    ['12', 12],
    [' 12.5', 13],
    [' 12.52', 13],
    ['abc', TEST_FALLBACK],
    ['', TEST_FALLBACK],
    [undefined, TEST_FALLBACK],
    ['a123', TEST_FALLBACK],
  ])('guardNumber(%s) = %s', (input, expected) =>
    expect(guardNumber(input, TEST_FALLBACK)).toBe(expected)
  );

  test('guardNumber custom beforeRound', () => {
    const formatter = jest.fn((v) => v + 1);

    expect(guardNumber('1234.1', TEST_FALLBACK, formatter)).toBe(1235);
    expect(formatter).toHaveBeenLastCalledWith(1234.1);
  });
});
