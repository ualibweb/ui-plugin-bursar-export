import { Button, Card, Col, TextField } from '@folio/stripes/components';
import React from 'react';
import { Field, useField } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import {
  CriteriaGroupType,
  CriteriaTerminalType,
  CriteriaGroup,
  CriteriaTerminal,
} from '../../../types/CriteriaTypes';
import ConditionalCard from '../../ConditionalCard';

export default function ConstantConditionalToken({
  prefix,
}: {
  prefix: string;
}) {
  const aggregate = useField<boolean>('aggregate', {
    subscription: { value: true },
    format: (value) => value ?? false,
  }).input.value;

  return (
    <FieldArray<CriteriaGroup | CriteriaTerminal>
      name={`${prefix}conditions`}
      defaultValue={[{ type: CriteriaTerminalType.PATRON_GROUP }]}
    >
      {({ fields }) => (
        <>
          <Col xs={12}>
            {fields.map((name, index) => (
              <ConditionalCard
                key={name}
                index={index}
                conditionName={name}
                patronOnly={aggregate}
                fieldArrayName={`${prefix}conditions`}
              >
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
              </ConditionalCard>
            ))}
          </Col>
          <Col xs={12}>
            <Card headerStart="Otherwise:">
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
              onClick={() => fields.push({ type: CriteriaGroupType.ALL_OF })}
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
