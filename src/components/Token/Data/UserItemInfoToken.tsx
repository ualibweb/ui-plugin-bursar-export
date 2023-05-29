import {
  Col,
  Select,
  SelectOptionType,
  TextField,
} from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import { ItemAttribute, UserAttribute } from '../../../types/TokenTypes';

export default function UserItemInfoToken<
  T extends ItemAttribute | UserAttribute
>({
  defaultValue,
  prefix,
  attributeName,
  options,
}: {
  defaultValue: T;
  prefix: string;
  attributeName: string;
  options: SelectOptionType<T>[];
}) {
  return (
    <>
      <Col xs={12} md={6}>
        <Field<T>
          name={`${prefix}${attributeName}`}
          defaultValue={defaultValue}
        >
          {(fieldProps) => (
            <Select<T>
              {...fieldProps}
              required
              label="Value"
              dataOptions={options}
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
