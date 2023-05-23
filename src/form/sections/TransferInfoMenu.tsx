import { Button, Card } from '@folio/stripes/components';
import React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import ConditionalCard from '../../components/ConditionalCard';
import TransferAccountFields from '../../components/TransferAccountFields';
import { CriteriaTerminalType } from '../../types/CriteriaTypes';

export default function TransferInfoMenu() {
  return (
    <FieldArray name="transferInfo.conditions">
      {({ fields }) => (
        <>
          {fields.map((name, index) => (
            <ConditionalCard
              key={name}
              index={index}
              fieldArrayName="transferInfo.conditions"
              conditionName={`${name}.condition`}
            >
              <TransferAccountFields prefix={`${name}.`} />
            </ConditionalCard>
          ))}

          <Card headerStart={fields.length ? 'Otherwise:' : 'Transfer to:'}>
            <TransferAccountFields prefix="transferInfo.else." />
          </Card>

          <Button
            onClick={() =>
              fields.push({
                condition: { type: CriteriaTerminalType.PATRON_GROUP },
              })
            }
          >
            Add condition
          </Button>

          <p style={{ margin: 0, display: fields.length ? 'block' : 'none' }}>
            <i>
              Conditions will be evaluated in order, with the first matched
              transfer account being used. If no conditions are matched, the
              account listed under &ldquo;otherwise&rdquo; will be used.
            </i>
          </p>
        </>
      )}
    </FieldArray>
  );
}
