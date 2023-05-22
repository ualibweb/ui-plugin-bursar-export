import { Button, Card, IconButton } from '@folio/stripes/components';
import React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import CriteriaCard from '../../components/Criteria/CriteriaCard';
import { CriteriaCardTerminalType } from '../../types/CriteriaTypes';
import TransferAccountFields from '../../components/TransferAccountFields';

export default function TransferInfoMenu() {
  return (
    <FieldArray name="transferInfo.conditions">
      {({ fields }) => (
        <>
          {fields.map((name, index) => (
            <Card
              key={name}
              headerStart="If:"
              headerEnd={
                <>
                  <IconButton
                    icon="caret-up"
                    disabled={index === 0}
                    onClick={() => fields.swap(index, index - 1)}
                  />
                  <IconButton
                    icon="caret-down"
                    disabled={index + 1 === fields.length}
                    onClick={() => fields.swap(index, index + 1)}
                  />
                  <IconButton
                    icon="trash"
                    onClick={() => fields.remove(index)}
                  />
                </>
              }
            >
              <CriteriaCard name={`${name}.condition`} alone />
              <TransferAccountFields prefix={`${name}.`} />
            </Card>
          ))}

          <Card headerStart={fields.length ? 'Otherwise:' : 'Transfer to:'}>
            <TransferAccountFields prefix="transferInfo.else." />
          </Card>

          <Button
            onClick={() =>
              fields.push({
                condition: { type: CriteriaCardTerminalType.PATRON_GROUP },
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
