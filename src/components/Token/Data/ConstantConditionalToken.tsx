import {
  Button,
  Card,
  Col,
  IconButton,
  TextField,
} from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import {
  CriteriaCardGroupType,
  CriteriaCardTerminalType,
  CriteriaGroup,
  CriteriaTerminal,
} from '../../../types/CriteriaTypes';
import CriteriaCard from '../../Criteria/CriteriaCard';

export default function ConstantConditionalToken({
  prefix,
}: {
  prefix: string;
}) {
  return (
    <FieldArray<CriteriaGroup | CriteriaTerminal>
      name={`${prefix}conditions`}
      defaultValue={[{ type: CriteriaCardTerminalType.PATRON_GROUP }]}
    >
      {({ fields }) => (
        <>
          <Col xs={12}>
            {fields.map((name, index) => (
              <Card
                key={name}
                headerStart="If:"
                headerEnd={
                  <IconButton
                    icon="trash"
                    onClick={() => fields.remove(index)}
                  />
                }
              >
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
