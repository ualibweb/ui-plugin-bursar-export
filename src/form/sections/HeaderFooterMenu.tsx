import { Button } from '@folio/stripes/components';
import React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { HeaderFooterTokenType } from '../../types/TokenTypes';

export default function HeaderFooterMenu({ name }: { name: string }) {
  return (
    <FieldArray name={name}>
      {({ fields }) => (
        <>
          {fields.map((innerName, index) => (
            <p key={innerName}>
              {innerName}
              {index}
            </p>
            // <HeaderFooterCard key={innerName} name={innerName} index={index} />
          ))}
          <Button
            onClick={() => fields.push({ type: HeaderFooterTokenType.NEWLINE })}
          >
            Add
          </Button>
        </>
      )}
    </FieldArray>
  );
}
