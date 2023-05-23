import { Card, Checkbox, Label } from '@folio/stripes/components';
import React from 'react';
import { Field, useField } from 'react-final-form';
import AggregateCriteriaCard from '../../components/AggregateCriteria/AggregateCriteriaCard';

export default function AggregateMenu() {
  const isAggregateEnabled = useField<boolean>('aggregate', {
    subscription: { value: true },
    format: (value) => value ?? false,
  }).input.value;

  return (
    <div>
      <Field name="aggregate" type="checkbox" defaultValue={false}>
        {(fieldProps) => (
          <Checkbox {...fieldProps} fullWidth label="Group data by patron" />
        )}
      </Field>
      <p>
        <i>
          If enabled, each output row will correspond to a single patron with
          all of their accounts, rather than just a single account.
        </i>
      </p>

      {isAggregateEnabled && <AggregateCriteriaCard />}
    </div>
  );
}
