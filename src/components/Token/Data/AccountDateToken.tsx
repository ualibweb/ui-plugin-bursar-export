import { Col, Select, TextField } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import DatePartPicker from '../Shared/DatePartPicker';
import TimezonePicker from '../Shared/TimezonePicker';

export default function AccountDateToken({ prefix }: { prefix: string }) {
  return (
    <>
      <Col xs={12} md={6}>
        <Field<'CREATED' | 'UPDATED' | 'DUE' | 'RETURNED'>
          name={`${prefix}attribute`}
          defaultValue="CREATED"
        >
          {(fieldProps) => (
            <Select<'CREATED' | 'UPDATED' | 'DUE' | 'RETURNED'>
              {...fieldProps}
              required
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
      <Col xs={12} md={6}>
        <DatePartPicker prefix={prefix} />
      </Col>
      <Col xs={12} md={6}>
        <Field name={`${prefix}text`}>
          {(fieldProps) => (
            <TextField<string>
              {...fieldProps}
              fullWidth
              label="Fallback value"
            />
          )}
        </Field>
      </Col>
      <Col xs={12} md={6}>
        <TimezonePicker prefix={prefix} />
      </Col>
      <Col xs={12}>
        <p style={{ margin: 0 }}>
          <i>
            If the chosen date is not available/applicable, the fallback value
            will be used instead.
          </i>
        </p>
      </Col>
    </>
  );
}
