import { faker } from '@faker-js/faker';
import {
  DataToken,
  DataTokenType,
  DateFormatType,
  ItemAttribute,
  UserAttribute,
} from '../../types/TokenTypes';
import LengthControl from '../../types/LengthControl';

export function guardNumber(value: string, fallback: number): number {
  const parsed = parseFloat(value);

  if (isNaN(parsed)) {
    return fallback;
  }

  return parsed;
}

export function formatDate(format: DateFormatType, date: Date): number {
  switch (format) {
    case DateFormatType.WEEK_YEAR_ISO:
    case DateFormatType.YEAR_LONG:
      return date.getFullYear();

    case DateFormatType.YEAR_SHORT:
      return date.getFullYear() % 100;

    case DateFormatType.MONTH:
      return date.getMonth() + 1;

    case DateFormatType.DATE:
      return date.getDate();

    case DateFormatType.HOUR:
      return date.getHours();

    case DateFormatType.MINUTE:
      return date.getMinutes();

    case DateFormatType.SECOND:
      return date.getSeconds();

    case DateFormatType.QUARTER:
      return Math.floor(date.getMonth() / 3 + 1);

    case DateFormatType.WEEK_OF_YEAR_ISO:
    default:
      const janFirst = new Date(date.getFullYear(), 0, 1);
      const dayOfYear = (date.getTime() - janFirst.getTime()) / 86400000 + 1;
      return Math.ceil(dayOfYear / 7);
  }
}

export function formatFeeFineToken(
  attribute: 'FEE_FINE_TYPE_ID' | 'FEE_FINE_TYPE_NAME'
): string {
  if (attribute === 'FEE_FINE_TYPE_ID') {
    return faker.string.uuid();
  } else {
    return faker.lorem.words();
  }
}

export function formatItemToken(attribute: ItemAttribute) {
  switch (attribute) {
    case 'BARCODE':
      return faker.string.alphanumeric(10);
    case 'NAME':
      return faker.lorem.words(5);
    case 'MATERIAL_TYPE':
      return faker.lorem.word();
    default:
      return faker.string.uuid();
  }
}

export function formatUserToken(attribute: UserAttribute) {
  switch (attribute) {
    case 'BARCODE':
    case 'EXTERNAL_SYSTEM_ID':
      return faker.string.alphanumeric(10);
    case 'USERNAME':
      return faker.internet.userName();
    case 'MIDDLE_NAME':
      return faker.person.middleName();
    case 'FIRST_NAME':
      return faker.person.firstName();
    case 'LAST_NAME':
      return faker.person.lastName();
    default:
      return faker.string.uuid();
  }
}

export function applyLengthControl(
  value: string,
  lengthControl?: LengthControl
): string {
  if (lengthControl === undefined || lengthControl.character?.length !== 1) {
    return value;
  }

  const desiredLength = parseInt(lengthControl?.length);
  if (isNaN(desiredLength)) {
    return value;
  }

  if (value.length < desiredLength) {
    if (lengthControl.direction === 'FRONT') {
      return (
        lengthControl.character.repeat(desiredLength - value.length) + value
      );
    } else {
      return (
        value + lengthControl.character.repeat(desiredLength - value.length)
      );
    }
  } else {
    if (lengthControl.direction === 'FRONT') {
      return value.substring(value.length - desiredLength);
    } else {
      return value.substring(0, desiredLength);
    }
  }
}

function applyDecimalFormat(value: number, decimal: boolean): string {
  if (!decimal) {
    return (value * 100).toFixed(0);
  } else {
    return value.toFixed(2);
  }
}

export function tokenToNode(
  dataToken: DataToken,
  amount: number,
  count: number
): string {
  switch (dataToken.type) {
    case DataTokenType.ARBITRARY_TEXT:
      return dataToken.text ?? '';
    case DataTokenType.NEWLINE:
      return '\n';
    case DataTokenType.NEWLINE_MICROSOFT:
      return '\r\n';
    case DataTokenType.TAB:
      return '\t';
    case DataTokenType.COMMA:
      return ',';
    case DataTokenType.SPACE:
      return ' '.repeat(parseInt(dataToken.repeat) ?? 1);

    case DataTokenType.CURRENT_DATE:
      return applyLengthControl(
        formatDate(dataToken.format, new Date()).toString(),
        dataToken.lengthControl
      );

    case DataTokenType.AGGREGATE_TOTAL:
    case DataTokenType.ACCOUNT_AMOUNT:
      return applyLengthControl(
        applyDecimalFormat(amount, dataToken.decimal),
        dataToken.lengthControl
      );

    case DataTokenType.ACCOUNT_DATE:
      return applyLengthControl(
        formatDate(dataToken.format, faker.date.past()).toString(),
        dataToken.lengthControl
      );

    case DataTokenType.FEE_FINE_TYPE:
      return applyLengthControl(
        formatFeeFineToken(dataToken.attribute),
        dataToken.lengthControl
      );

    case DataTokenType.ITEM_INFO:
      return applyLengthControl(
        formatItemToken(dataToken.attribute),
        dataToken.lengthControl
      );

    case DataTokenType.USER_DATA:
      return applyLengthControl(
        formatUserToken(dataToken.attribute),
        dataToken.lengthControl
      );

    case DataTokenType.CONSTANT_CONDITIONAL:
      return faker.helpers.arrayElement([
        ...(dataToken.conditions ?? [])
          .map((cond) => cond.value)
          .filter((v) => v),
        dataToken.else,
      ]);

    case DataTokenType.AGGREGATE_COUNT:
      return applyLengthControl(count.toString(), dataToken.lengthControl);

    default:
      return '';
  }
}

export function generateEntry(
  dataToUse: DataToken[],
  isAggregate: boolean
): { elements: string[]; amount: number; count: number } {
  const amount = faker.number.float({ min: 5, max: 100, precision: 0.01 });
  const count = isAggregate ? faker.number.int({ min: 1, max: 10 }) : 1;

  return {
    elements: dataToUse.map((token) => tokenToNode(token, amount, count)),
    amount,
    count,
  };
}

export default function createPreviewData(
  dataToUse: DataToken[],
  isAggregate: boolean
): { dataPreview: string; totalAmount: number; totalCount: number } {
  const numEntries = faker.number.int({ min: 3, max: 12 });

  const results: string[] = [];
  for (let i = 0; i < numEntries; i++) {
    const { elements, amount, count } = generateEntry(dataToUse, isAggregate);
    results.push(...elements);
  }

  return {
    dataPreview: results.join(''),
    totalAmount: 0,
    totalCount: 0,
  };
}
