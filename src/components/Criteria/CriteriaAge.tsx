import { Col, TextField } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

export default function CriteriaAge({ prefix }: { prefix: string }) {
  return (
    <Col xs={12}>
      <Field name={`${prefix}numDays`}>
        {(fieldProps) => (
          <TextField<number>
            {...fieldProps}
            fullWidth
            marginBottom0
            required
            type="number"
            label={
              <FormattedMessage id="ui-plugin-bursar-export.bursarExports.criteria.age.value" />
            }
            min={1}
            step={1}
          />
        )}
      </Field>
    </Col>
  );
}
