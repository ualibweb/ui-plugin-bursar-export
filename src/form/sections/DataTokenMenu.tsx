import { Button } from '@folio/stripes/components';
import React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import DataTokenCard from '../../components/Token/Data/DataTokenCard';
import { DataTokenType } from '../../types/TokenTypes';

export default function DataTokenMenu() {
  return (
    <FieldArray name="data">
      {({ fields }) => (
        <>
          {fields.map((innerName, index) => (
            <DataTokenCard
              key={innerName}
              name={innerName}
              index={index}
              isLast={index + 1 === fields.length}
            />
          ))}
          <Button onClick={() => fields.push({ type: DataTokenType.NEWLINE })}>
            Add
          </Button>
        </>
      )}
    </FieldArray>
  );
}
