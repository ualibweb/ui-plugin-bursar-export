import { Checkbox, Col } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';

export default function AggregateTotalToken({ prefix }: { prefix: string }) {
  return (
    <Col xs={12}>
      <Field name={`${prefix}decimal`} type="checkbox" defaultValue={true}>
        {(fieldProps) => (
          <Checkbox
            {...fieldProps}
            fullWidth
            label="Include the decimal point"
          />
        )}
      </Field>
      <p style={{ margin: 0 }}>
        <i>
          If selected, amounts will be exported like &ldquo;12.50&rdquo;; if
          left unselected, they will be exported like &ldquo;1250&rdquo;.
        </i>
      </p>
    </Col>
  );
}
