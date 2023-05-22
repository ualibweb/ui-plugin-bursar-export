import { Row } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { useField } from 'react-final-form';
import { DataTokenType } from '../../../types/TokenTypes';
import AmountWithDecimalToken from '../Shared/AmountWithDecimalToken';
import ArbitraryTextToken from '../Shared/ArbitraryTextToken';
import CurrentDateToken from '../Shared/CurrentDateToken';
import WhitespaceToken from '../Shared/WhitespaceToken';

export const EMPTY_BODY_TYPES = [
  DataTokenType.COMMA,
  DataTokenType.NEWLINE,
  DataTokenType.NEWLINE_MICROSOFT,
  DataTokenType.TAB,
];

export function isDataBodyEmpty(type: DataTokenType | undefined) {
  return EMPTY_BODY_TYPES.includes(type ?? DataTokenType.NEWLINE);
}

export default function DataCardBody({ name }: { name: string }) {
  const type = useField<DataTokenType>(`${name}.type`, {
    subscription: { value: true },
    format: (value) => value ?? DataTokenType.NEWLINE,
  }).input.value;

  const cardInterior = useMemo(() => {
    switch (type) {
      case DataTokenType.ARBITRARY_TEXT:
        return (
          <Row>
            <ArbitraryTextToken prefix={`${name}.`} />
          </Row>
        );
      case DataTokenType.SPACE:
        return (
          <Row>
            <WhitespaceToken prefix={`${name}.`} />
          </Row>
        );
      case DataTokenType.CURRENT_DATE:
        return (
          <Row>
            <CurrentDateToken prefix={`${name}.`} />
          </Row>
        );

      case DataTokenType.ACCOUNT_AMOUNT:
        return (
          <Row>
            <AmountWithDecimalToken prefix={`${name}.`} />
          </Row>
        );

      default:
        return <div />;
    }
  }, [type]);

  return <div>{cardInterior}</div>;
}
