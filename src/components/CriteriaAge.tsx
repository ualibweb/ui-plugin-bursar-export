import { Col, TextField } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';

export default function CriteriaAge({ prefix }: { prefix: string }) {
  return (
    <>
      <Col xs={12}>
        <Field name={`${prefix}numDays`}>
          {(fieldProps) => (
            <TextField<number>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              label="Older than (days)"
              min={1}
            />
          )}
        </Field>
      </Col>
    </>
  );
}
