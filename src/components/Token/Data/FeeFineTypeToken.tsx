import { Col, Select } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';

export default function FeeFineTypeToken({ prefix }: { prefix: string }) {
  return (
    <Col xs={12}>
      <Field<'FEE_FINE_TYPE_ID' | 'FEE_FINE_TYPE_NAME'>
        name={`${prefix}feeFineAttribute`}
        defaultValue="FEE_FINE_TYPE_NAME"
      >
        {(fieldProps) => (
          <Select<'FEE_FINE_TYPE_ID' | 'FEE_FINE_TYPE_NAME'>
            {...fieldProps}
            required
            marginBottom0
            label="Attribute"
            dataOptions={[
              {
                label: 'Type name',
                value: 'FEE_FINE_TYPE_NAME',
              },
              {
                label: 'Type ID',
                value: 'FEE_FINE_TYPE_ID',
              },
            ]}
          />
        )}
      </Field>
    </Col>
  );
}
