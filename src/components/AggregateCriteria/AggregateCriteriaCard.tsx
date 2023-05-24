import { Card, Col, Row, Select, TextField } from '@folio/stripes/components';
import React from 'react';
import { CriteriaAggregateType } from '../../types/CriteriaTypes';
import { Field, useField } from 'react-final-form';
import OperatorSelect from '../Criteria/OperatorSelect';
import useMonetaryOnBlur from '../../hooks/';

export default function AggregateCriteriaCard() {
  const selectedType = useField<CriteriaAggregateType>('aggregateFilter.type', {
    subscription: { value: true },
    format: (value) => value ?? CriteriaAggregateType.PASS,
  }).input.value;

  const monetaryOnBlur = useMonetaryOnBlur('aggregateFilter.amountDollars');

  return (
    <Card headerStart="Only include patrons with:">
      <Row>
        <Col xs={12} md={4}>
          <Field
            name="aggregateFilter.type"
            defaultValue={CriteriaAggregateType.PASS}
          >
            {(fieldProps) => (
              <Select<CriteriaAggregateType>
                {...fieldProps}
                fullWidth
                marginBottom0
                required
                label="Filter type"
                dataOptions={[
                  {
                    label: 'None (include all patrons)',
                    value: CriteriaAggregateType.PASS,
                  },
                  {
                    label: 'Number of accounts',
                    value: CriteriaAggregateType.NUM_ROWS,
                  },
                  {
                    label: 'Total amount',
                    value: CriteriaAggregateType.TOTAL_AMOUNT,
                  },
                ]}
              />
            )}
          </Field>
        </Col>

        {selectedType !== CriteriaAggregateType.PASS && (
          <Col xs={12} md={4}>
            <OperatorSelect name="aggregateFilter.operator" />
          </Col>
        )}

        {selectedType === CriteriaAggregateType.NUM_ROWS && (
          <Col xs={12} md={4}>
            <Field name="aggregateFilter.amount">
              {(fieldProps) => (
                <TextField<number>
                  {...fieldProps}
                  fullWidth
                  marginBottom0
                  required
                  type="number"
                  label="Number of accounts"
                  min={1}
                  step={1}
                />
              )}
            </Field>
          </Col>
        )}

        {selectedType === CriteriaAggregateType.TOTAL_AMOUNT && (
          <Col xs={12} md={4}>
            <Field name="aggregateFilter.amountDollars">
              {(fieldProps) => (
                <TextField<number>
                  {...fieldProps}
                  fullWidth
                  marginBottom0
                  required
                  type="number"
                  label="Amount"
                  min={0}
                  step={0.01}
                  onBlur={monetaryOnBlur}
                />
              )}
            </Field>
          </Col>
        )}
      </Row>

      <p style={{ marginBottom: 0 }}>
        <i>
          This will be applied after accounts are evaluated per the
          &ldquo;Criteria&rdquo; specified above.
        </i>
      </p>
    </Card>
  );
}
