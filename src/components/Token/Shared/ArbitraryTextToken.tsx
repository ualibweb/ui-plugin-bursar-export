import { Col, TextField } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';

export default function ArbitraryTextToken({ prefix }: { prefix: string }) {
  return (
    <Col xs={12}>
      <Field name={`${prefix}text`}>
        {(fieldProps) => (
          <TextField<string>
            {...fieldProps}
            fullWidth
            marginBottom0
            required
            label="Value"
          />
        )}
      </Field>
    </Col>
  );
}
