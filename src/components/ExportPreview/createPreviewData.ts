import { faker } from '@faker-js/faker';
import {
  DataToken,
  DataTokenType,
  ItemAttribute,
  UserAttribute,
} from '../../types/TokenTypes';
import guardNumber from '../../utils/guardNumber';
import { applyDecimalFormat, applyLengthControl, formatDate } from './utils';

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
    case 'FIRST_NAME':
      return faker.person.firstName();
    case 'MIDDLE_NAME':
      return faker.person.middleName();
    case 'LAST_NAME':
      return faker.person.lastName();
    default:
      return faker.string.uuid();
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
      return ' '.repeat(guardNumber(dataToken.repeat, 1));

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
  tokens: DataToken[],
  isAggregate: boolean
): { elements: string[]; amount: number; count: number } {
  const amount = faker.number.float({ min: 5, max: 100, precision: 0.01 });
  const count = isAggregate ? faker.number.int({ min: 1, max: 10 }) : 1;

  return {
    elements: tokens.map((token) => tokenToNode(token, amount, count)),
    amount,
    count,
  };
}

export default function createPreviewData(
  tokens: DataToken[],
  isAggregate: boolean
): { dataPreview: string; totalAmount: number; totalCount: number } {
  const numEntries = faker.number.int({ min: 3, max: 12 });

  const results: string[] = [];
  let totalAmount = 0;
  let totalCount = 0;
  for (let i = 0; i < numEntries; i++) {
    const { elements, amount, count } = generateEntry(tokens, isAggregate);
    results.push(...elements);
    totalAmount += amount;
    totalCount += count;
  }

  return {
    dataPreview: results.join(''),
    totalAmount,
    totalCount,
  };
}
