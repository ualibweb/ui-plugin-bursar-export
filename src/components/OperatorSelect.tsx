import { Select } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import { ComparisonOperator } from '../form/types';

export default function OperatorSelect({ name }: { name: string }) {
  return (
    <Field name={name}>
      {(fieldProps) => (
        <Select<ComparisonOperator | undefined>
          {...fieldProps}
          fullWidth
          marginBottom0
          required
          label="Comparison operator"
          dataOptions={[
            { label: '', value: undefined },
            {
              label: 'Less than but not equal to',
              value: ComparisonOperator.LESS_THAN,
            },
            {
              label: 'Less than or equal to',
              value: ComparisonOperator.LESS_THAN_EQUAL,
            },
            {
              label: 'Greater than but not equal to',
              value: ComparisonOperator.GREATER_THAN,
            },
            {
              label: 'Greater than or equal to',
              value: ComparisonOperator.GREATER_THAN_EQUAL,
            },
          ]}
        />
      )}
    </Field>
  );
}
