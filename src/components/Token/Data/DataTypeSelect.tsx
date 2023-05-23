import { Select } from '@folio/stripes/components';
import React from 'react';
import { Field, useField } from 'react-final-form';
import { DataTokenType } from '../../../types/TokenTypes';

const ALWAYS_AVAILABLE_OPTIONS = [
  {
    label: 'Newline (LF)',
    value: DataTokenType.NEWLINE,
  },
  {
    label: 'Newline (Microsoft, CRLF)',
    value: DataTokenType.NEWLINE_MICROSOFT,
  },
  {
    label: 'Tab',
    value: DataTokenType.TAB,
  },
  {
    label: 'Comma',
    value: DataTokenType.COMMA,
  },
  {
    label: 'Whitespace',
    value: DataTokenType.SPACE,
  },

  {
    label: '',
    value: DataTokenType.NEWLINE,
    disabled: true,
  },

  {
    label: 'Arbitrary text',
    value: DataTokenType.ARBITRARY_TEXT,
  },
  {
    label: 'Current date',
    value: DataTokenType.CURRENT_DATE,
  },
  {
    label: 'Conditional text',
    value: DataTokenType.CONSTANT_CONDITIONAL,
  },

  {
    label: '',
    value: DataTokenType.NEWLINE,
    disabled: true,
  },

  {
    label: 'User info',
    value: DataTokenType.USER_DATA,
  },
];

const NON_AGGREGATE_OPTIONS = [
  {
    label: 'Account amount',
    value: DataTokenType.ACCOUNT_AMOUNT,
  },
  {
    label: 'Account date',
    value: DataTokenType.ACCOUNT_DATE,
  },
  {
    label: 'Fee/fine type',
    value: DataTokenType.FEE_FINE_TYPE,
  },
  {
    label: 'Item info',
    value: DataTokenType.ITEM_INFO,
  },
];

const AGGREGATE_OPTIONS = [
  {
    label: 'Total amount',
    value: DataTokenType.AGGREGATE_TOTAL,
  },
  {
    label: 'Number of accounts',
    value: DataTokenType.AGGREGATE_COUNT,
  },
];

export default function DataTypeSelect({ name }: { name: string }) {
  const isAggregate = useField<boolean>('aggregate', {
    subscription: { value: true },
    format: (value) => value ?? false,
  }).input.value;

  return (
    <Field name={name} defaultValue={DataTokenType.NEWLINE}>
      {(fieldProps) => (
        <Select<DataTokenType>
          {...fieldProps}
          required
          marginBottom0
          dataOptions={[
            // TODO: sort these alphabetically per i18n
            ...ALWAYS_AVAILABLE_OPTIONS,
            ...(isAggregate ? AGGREGATE_OPTIONS : NON_AGGREGATE_OPTIONS),
          ]}
        />
      )}
    </Field>
  );
}
