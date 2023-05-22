import { Col, TextField } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';

export default function WhitespaceToken({ prefix }: { prefix: string }) {
  return (
    <Col xs={12}>
      <Field name={`${prefix}repeat`}>
        {(fieldProps) => (
          <TextField<number>
            {...fieldProps}
            fullWidth
            marginBottom0
            required
            type="number"
            min={1}
            label="Number of spaces"
          />
        )}
      </Field>
    </Col>
  );
}
