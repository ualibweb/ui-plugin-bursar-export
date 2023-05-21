import React, { useMemo } from 'react';
import { HeaderFooterTokenType } from '../../../types/TokenTypes';
import { useField } from 'react-final-form';
import { Row } from '@folio/stripes/components';
import ArbitraryTextToken from '../Shared/ArbitraryTextToken';
import WhitespaceToken from '../Shared/WhitespaceToken';

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

  const cardInterior = useMemo(() => {
    switch (type) {
      case HeaderFooterTokenType.ARBITRARY_TEXT:
        return (
          <Row>
            <ArbitraryTextToken prefix={`${name}.`} />
          </Row>
        );
      case HeaderFooterTokenType.SPACE:
        return (
          <Row>
            <WhitespaceToken prefix={`${name}.`} />
          </Row>
        );

      default:
        return <div />;
    }
  }, [type]);

  return <div>{cardInterior}</div>;
}
