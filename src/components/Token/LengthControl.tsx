import {
  Card,
  Checkbox,
  Col,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';
import React from 'react';
import { Field, useField } from 'react-final-form';

function FakeHeader() {
  return <div />;
}

export default function LengthControl({ prefix }: { prefix: string }) {
  const isTruncateEnabled = useField<boolean>(`${prefix}truncate`, {
    subscription: { value: true },
    format: (value) => value ?? false,
  }).input.value;

  return (
    <Card headerComponent={FakeHeader}>
      <Row style={{}}>
        <Col xs={6} md={3}>
          <Field name={`${prefix}length`}>
            {(fieldProps) => (
              <TextField<number>
                {...fieldProps}
                fullWidth
                marginBottom0
                type="number"
                min={1}
                label="Desired length"
              />
            )}
          </Field>
        </Col>
        <Col xs={6} md={3}>
          <Field name={`${prefix}character`}>
            {(fieldProps) => (
              <TextField<string>
                {...fieldProps}
                fullWidth
                marginBottom0
                maxLength={1}
                label="Fill extra space with"
              />
            )}
          </Field>
        </Col>
        <Col xs={6} md={3}>
          <Field<'FRONT' | 'BACK'>
            name={`${prefix}direction`}
            defaultValue="FRONT"
          >
            {(fieldProps) => (
              <Select<'FRONT' | 'BACK'>
                {...fieldProps}
                marginBottom0
                label={
                  isTruncateEnabled
                    ? 'Add/remove characters to/from'
                    : 'Add characters to'
                }
                dataOptions={[
                  { label: 'Start', value: 'FRONT' },
                  { label: 'End', value: 'BACK' },
                ]}
              />
            )}
          </Field>
        </Col>
        <Col xs={6} md={3}>
          <Field name={`${prefix}truncate`} type="checkbox">
            {(fieldProps) => (
              <Checkbox
                {...fieldProps}
                fullWidth
                label="Truncate if too long"
              />
            )}
          </Field>
        </Col>{' '}
      </Row>
    </Card>
  );
}
