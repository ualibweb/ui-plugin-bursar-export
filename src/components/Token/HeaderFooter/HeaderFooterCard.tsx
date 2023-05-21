import React from 'react';
import {
  HeaderFooterTokenType,
  TOKEN_TYPES_WITH_LENGTH_CONTROL,
} from '../../../types/TokenTypes';
import GenericTokenCard from '../GenericTokenCard';
import { useField } from 'react-final-form';

export interface HeaderFooterCardProps {
  fieldArrayName: string;
  name: string;
  index: number;
  isLast: boolean;
}

export default function HeaderFooterCard({
  fieldArrayName,
  name,
  index,
  isLast,
}: HeaderFooterCardProps) {
  const type = useField<HeaderFooterTokenType>(`${name}.type`, {
    subscription: { value: true },
    format: (value) => value ?? HeaderFooterTokenType.NEWLINE,
  }).input.value;

  return (
    <GenericTokenCard<HeaderFooterTokenType>
      fieldArrayName={fieldArrayName}
      name={name}
      index={index}
      isLast={isLast}
      SelectComponent={() => null}
      BodyComponent={() => null}
      isBodyEmpty={() => true}
      shouldHaveLengthControl={() =>
        TOKEN_TYPES_WITH_LENGTH_CONTROL.includes(type)
      }
    />
  );
}
