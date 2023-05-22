import { Button, Card, Col, TextField } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { CriteriaCardGroupType } from '../../../types/CriteriaTypes';
import CriteriaCard from '../../Criteria/CriteriaCard';

export default function ConstantConditionalToken({
  prefix,
}: {
  prefix: string;
}) {
  return (
    <FieldArray name={`${prefix}conditions`}>
      {({ fields }) => (
        <>
          <Col xs={12}>
            {fields.map((name, index) => (
              <Card headerStart="If:">
                <CriteriaCard
                  name={name}
                  alone
                  onRemove={() => fields.remove(index)}
                />
                <Field name={`${name}.value`}>
                  {(fieldProps) => (
                    <TextField<string>
                      {...fieldProps}
                      fullWidth
                      required
                      label="Then use:"
                    />
                  )}
                </Field>
              </Card>
            ))}
          </Col>
          <Col xs={12}>
            <Card headerStart="Otherwise">
              <Field name={`${prefix}else`}>
                {(fieldProps) => (
                  <TextField<string>
                    {...fieldProps}
                    fullWidth
                    required
                    label="Fallback value"
                  />
                )}
              </Field>
            </Card>
          </Col>
          <Col xs={12}>
            <Button
              onClick={() =>
                fields.push({ type: CriteriaCardGroupType.ALL_OF })
              }
            >
              Add condition
            </Button>
            <p style={{ margin: 0 }}>
              <i>
                Conditions will be evaluated in order, with the first matched
                value being used. If no conditions are matched, the fallback
                value will be used.
              </i>
            </p>
          </Col>
        </>
      )}
    </FieldArray>
  );
}
