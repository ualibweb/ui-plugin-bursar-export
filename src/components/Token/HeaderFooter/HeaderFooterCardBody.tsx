import React from 'react';
import { HeaderFooterTokenType } from '../../../types/TokenTypes';
import { useField } from 'react-final-form';

export const EMPTY_BODY_TYPES = [
  HeaderFooterTokenType.AGGREGATE_COUNT,
  HeaderFooterTokenType.COMMA,
  HeaderFooterTokenType.NEWLINE,
  HeaderFooterTokenType.NEWLINE_MICROSOFT,
  HeaderFooterTokenType.TAB,
];

export function isHeaderFooterBodyEmpty(
  type: HeaderFooterTokenType | undefined
) {
  return EMPTY_BODY_TYPES.includes(type ?? HeaderFooterTokenType.NEWLINE);
}

export default function HeaderFooterCardBody({ name }: { name: string }) {
  const type = useField<HeaderFooterTokenType>(`${name}.type`, {
    subscription: { value: true },
    format: (value) => value ?? HeaderFooterTokenType.NEWLINE,
  }).input.value;

  if (isHeaderFooterBodyEmpty(type)) {
    return <div />;
  }

  return <h1>{name}</h1>;
}
