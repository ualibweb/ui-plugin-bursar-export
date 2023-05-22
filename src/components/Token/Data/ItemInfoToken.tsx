import { Col, Select, TextField } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import { ItemAttribute } from '../../../types/TokenTypes';

export default function ItemInfoToken({ prefix }: { prefix: string }) {
  return (
    <>
      <Col xs={12} md={6}>
        <Field<ItemAttribute> name={`${prefix}attribute`} defaultValue="NAME">
          {(fieldProps) => (
            <Select<ItemAttribute>
              {...fieldProps}
              required
              label="Value"
              dataOptions={[
                {
                  label: 'Name',
                  value: 'NAME',
                },
                {
                  label: 'Barcode',
                  value: 'BARCODE',
                },
                {
                  label: 'Material type',
                  value: 'MATERIAL_TYPE',
                },
                {
                  label: 'Institution ID',
                  value: 'INSTITUTION_ID',
                },
                {
                  label: 'Campus ID',
                  value: 'CAMPUS_ID',
                },
                {
                  label: 'Library ID',
                  value: 'LIBRARY_ID',
                },
                {
                  label: 'Location ID',
                  value: 'LOCATION_ID',
                },
              ]}
            />
          )}
        </Field>
      </Col>
      <Col xs={12} md={6}>
        <Field name={`${prefix}placeholder`}>
          {(fieldProps) => (
            <TextField<string>
              {...fieldProps}
              fullWidth
              label="Fallback value"
            />
          )}
        </Field>
      </Col>
      <Col xs={12}>
        <p style={{ margin: 0 }}>
          <i>
            If the chosen value is not available/applicable, the fallback value
            will be used instead.
          </i>
        </p>
      </Col>
    </>
  );
}
