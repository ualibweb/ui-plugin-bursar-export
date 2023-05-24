import guardNumber from './guardNumber';

describe('guardNumber function', () => {
  const TEST_FALLBACK = 1234.56;

  test.each([
    ['1', 1],
    ['12', 12],
    [' 12.5', 12.5],
    [' 12.52', 12.52],
    ['abc', TEST_FALLBACK],
    ['', TEST_FALLBACK],
    [undefined, TEST_FALLBACK],
    ['a123', TEST_FALLBACK],
  ])('guardNumber(%s) = %s', (input, expected) =>
    expect(guardNumber(input, TEST_FALLBACK)).toBe(expected)
  );
});
