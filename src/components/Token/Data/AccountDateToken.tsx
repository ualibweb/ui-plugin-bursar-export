import { Col, Select } from '@folio/stripes/components';
import React from 'react';
import TimezonePicker from '../Shared/TimezonePicker';
import DatePartPicker from '../Shared/DatePartPicker';
import { DataTokenType } from '../../../types/TokenTypes';
import { Field } from 'react-final-form';

export default function AccountDateToken({ prefix }: { prefix: string }) {
  return (
    <>
      <Col xs={12} md={4}>
        <Field<'CREATED' | 'UPDATED' | 'DUE' | 'RETURNED'>
          name={`${prefix}attribute`}
          defaultValue="CREATED"
        >
          {(fieldProps) => (
            <Select<'CREATED' | 'UPDATED' | 'DUE' | 'RETURNED'>
              {...fieldProps}
              required
              marginBottom0
              label="Date"
              dataOptions={[
                {
                  label: 'Creation date',
                  value: 'CREATED',
                },
                {
                  label: 'Last updated date',
                  value: 'UPDATED',
                },
                {
                  label: 'Item due date',
                  value: 'DUE',
                },
                {
                  label: 'Loan end date',
                  value: 'DUE',
                },
              ]}
            />
          )}
        </Field>
      </Col>
      <Col xs={12} md={4}>
        <DatePartPicker prefix={prefix} />
      </Col>
      <Col xs={12} md={4}>
        <TimezonePicker prefix={prefix} />
      </Col>
    </>
  );
}
