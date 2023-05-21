import LengthControl from './LengthControl';

export enum HeaderFooterTokenType {
  ARBITRARY_TEXT = 'Constant',
  NEWLINE = 'Newline',
  NEWLINE_MICROSOFT = 'NewlineMicrosoft',
  TAB = 'Tab',
  COMMA = 'Comma',
  SPACE = 'Space',

  CURRENT_DATE = 'CurrentDate',
  AGGREGATE_COUNT = 'AggregateCount',
  AGGREGATE_TOTAL = 'AggregateTotal',
}

export enum DateFormatType {
  YEAR_LONG = 'YEAR_LONG',
  YEAR_SHORT = 'YEAR_SHORT',
  MONTH = 'MONTH',
  DATE = 'DATE',
  HOUR = 'HOUR',
  MINUTE = 'MINUTE',
  SECOND = 'SECOND',
  QUARTER = 'QUARTER',
  WEEK_OF_YEAR = 'WEEK_OF_YEAR',
  WEEK_OF_YEAR_ISO = 'WEEK_OF_YEAR_ISO',
  WEEK_YEAR = 'WEEK_YEAR',
  WEEK_YEAR_ISO = 'WEEK_YEAR_ISO',
}

export type HeaderFooterToken =
  | {
      type: HeaderFooterTokenType.NEWLINE;
    }
  | {
      type: HeaderFooterTokenType.NEWLINE_MICROSOFT;
    }
  | {
      type: HeaderFooterTokenType.TAB;
    }
  | {
      type: HeaderFooterTokenType.COMMA;
    }
  | {
      type: HeaderFooterTokenType.SPACE;
      repeat?: string;
    }
  | {
      type: HeaderFooterTokenType.ARBITRARY_TEXT;
      text: string;
    }
  | {
      type: HeaderFooterTokenType.CURRENT_DATE;
      value: DateFormatType;
      timezone: string;
      lengthControl?: LengthControl;
    }
  | {
      type: HeaderFooterTokenType.AGGREGATE_COUNT;
      lengthControl?: LengthControl;
    }
  | {
      type: HeaderFooterTokenType.AGGREGATE_TOTAL;
      decimal: boolean;
      lengthControl?: LengthControl;
    };

export const TOKEN_TYPES_WITH_LENGTH_CONTROL = [
  HeaderFooterTokenType.CURRENT_DATE,
  HeaderFooterTokenType.AGGREGATE_COUNT,
  HeaderFooterTokenType.AGGREGATE_TOTAL,
];
