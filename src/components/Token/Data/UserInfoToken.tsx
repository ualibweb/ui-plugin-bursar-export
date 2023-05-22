import { Col, Select, TextField } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import { UserAttribute } from '../../../types/TokenTypes';

export default function UserInfoToken({ prefix }: { prefix: string }) {
  return (
    <>
      <Col xs={12} md={6}>
        <Field<UserAttribute>
          name={`${prefix}attribute`}
          defaultValue="EXTERNAL_SYSTEM_ID"
        >
          {(fieldProps) => (
            <Select<UserAttribute>
              {...fieldProps}
              required
              label="Value"
              dataOptions={[
                {
                  label: 'Folio ID',
                  value: 'FOLIO_ID',
                },
                {
                  label: 'External system ID',
                  value: 'EXTERNAL_SYSTEM_ID',
                },
                {
                  label: 'Patron group ID',
                  value: 'PATRON_GROUP_ID',
                },
                {
                  label: 'Barcode',
                  value: 'BARCODE',
                },
                {
                  label: 'Username',
                  value: 'USERNAME',
                },
                {
                  label: 'First name',
                  value: 'FIRST_NAME',
                },
                {
                  label: 'Middle name',
                  value: 'MIDDLE_NAME',
                },
                {
                  label: 'Last name',
                  value: 'LAST_NAME',
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
