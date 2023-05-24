import { DateFormatType } from '../../types/TokenTypes';
import { formatDate, guardNumber } from './utils';

describe('Export preview utility functions', () => {
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

  describe('date formatter', () => {
    // Jan 2, 2021 @ 03:04:05
    const TEST_DATE = new Date(2021, 0, 2, 3, 4, 5);

    test.each([
      [DateFormatType.YEAR_LONG, 2021],
      [DateFormatType.YEAR_SHORT, 21],
      [DateFormatType.MONTH, 1],
      [DateFormatType.DATE, 2],
      [DateFormatType.HOUR, 3],
      [DateFormatType.MINUTE, 4],
      [DateFormatType.SECOND, 5],
      [DateFormatType.QUARTER, 1],
      [DateFormatType.WEEK_OF_YEAR_ISO, 1],
      [DateFormatType.WEEK_YEAR_ISO, 2021],

      // garbage in = garbage out, so we don't care what the output is
      ['' as DateFormatType, 1],
    ])('Format %s gives %s', (format, expected) =>
      expect(formatDate(format, TEST_DATE)).toBe(expected)
    );
  });
});
