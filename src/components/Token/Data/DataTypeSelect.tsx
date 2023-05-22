import React from 'react';
import { DataTokenType } from '../../../types/TokenTypes';
import { Select } from '@folio/stripes/components';
import { Field } from 'react-final-form';

export default function DataTypeSelect({ name }: { name: string }) {
  return (
    <Field name={name} defaultValue={DataTokenType.NEWLINE}>
      {(fieldProps) => (
        <Select<DataTokenType>
          {...fieldProps}
          required
          marginBottom0
          dataOptions={[
            // TODO: sort these alphabetically per i18n
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
            {
              label: 'User info',
              value: DataTokenType.USER_DATA,
            },
          ]}
        />
      )}
    </Field>
  );
}
