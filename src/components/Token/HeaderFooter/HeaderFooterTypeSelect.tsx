import React from 'react';
import { HeaderFooterTokenType } from '../../../types/TokenTypes';
import { Select } from '@folio/stripes/components';
import { Field } from 'react-final-form';

export default function HeaderFooterTypeSelect({ name }: { name: string }) {
  return (
    <Field name={name} defaultValue={HeaderFooterTokenType.NEWLINE}>
      {(fieldProps) => (
        <Select<HeaderFooterTokenType>
          {...fieldProps}
          required
          marginBottom0
          dataOptions={[
            // TODO: sort these alphabetically per i18n
            {
              label: 'Newline (LF)',
              value: HeaderFooterTokenType.NEWLINE,
            },
            {
              label: 'Newline (Microsoft, CRLF)',
              value: HeaderFooterTokenType.NEWLINE_MICROSOFT,
            },
            {
              label: 'Tab',
              value: HeaderFooterTokenType.TAB,
            },
            {
              label: 'Comma',
              value: HeaderFooterTokenType.COMMA,
            },
            {
              label: 'Whitespace',
              value: HeaderFooterTokenType.SPACE,
            },

            {
              label: '',
              value: HeaderFooterTokenType.NEWLINE,
              disabled: true,
            },

            {
              label: 'Arbitrary text',
              value: HeaderFooterTokenType.ARBITRARY_TEXT,
            },
            {
              label: 'Current date',
              value: HeaderFooterTokenType.CURRENT_DATE,
            },
            {
              label: 'Number of accounts',
              value: HeaderFooterTokenType.AGGREGATE_COUNT,
            },
            {
              label: 'Total amount',
              value: HeaderFooterTokenType.AGGREGATE_TOTAL,
            },
          ]}
        />
      )}
    </Field>
  );
}
