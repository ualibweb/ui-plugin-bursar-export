import { Card, Loading, Row } from '@folio/stripes/components';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useField } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import {
  CriteriaCardGroupType,
  CriteriaCardTerminalType,
} from '../types/CriteriaTypes';
import CriteriaAge from './CriteriaAge';
import CriteriaAmount from './CriteriaAmount';
import css from './CriteriaCard.module.css';
import CriteriaCardSelect from './CriteriaCardSelect';
import CriteriaCardToolbox from './CriteriaCardToolbox';
import CriteriaFeeFineType from './CriteriaFeeFineType';
import CriteriaLocation from './CriteriaLocation';
import CriteriaPatronGroup from './CriteriaPatronGroup';
import CriteriaServicePoint from './CriteriaServicePoint';

export default function CriteriaCard({
  name,
  onRemove,
  root = false,
  alone,
}: {
  name: string;
  onRemove?: () => void;
  root?: boolean;
  alone: boolean;
}) {
  const type = useField<
    CriteriaCardGroupType | CriteriaCardTerminalType | undefined
  >(`${name}.type`, { subscription: { value: true } }).input.value;

  const cardInterior = useMemo(() => {
    switch (type) {
      case CriteriaCardTerminalType.PASS:
        return <div />;

      case CriteriaCardGroupType.ALL_OF:
      case CriteriaCardGroupType.ANY_OF:
      case CriteriaCardGroupType.NONE_OF:
        return (
          <FieldArray name={`${name}.criteria`}>
            {({ fields }) =>
              fields.map((innerName, index) => (
                <CriteriaCard
                  key={innerName}
                  name={innerName}
                  alone={fields.length === 1}
                  onRemove={() => fields.remove(index)}
                />
              ))
            }
          </FieldArray>
        );

      case CriteriaCardTerminalType.AGE:
        return (
          <Row>
            <CriteriaAge prefix={`${name}.`} />
          </Row>
        );
      case CriteriaCardTerminalType.AMOUNT:
        return (
          <Row>
            <CriteriaAmount prefix={`${name}.`} />
          </Row>
        );
      case CriteriaCardTerminalType.FEE_FINE_TYPE:
        return (
          <Row>
            <CriteriaFeeFineType prefix={`${name}.`} />
          </Row>
        );
      case CriteriaCardTerminalType.LOCATION:
        return (
          <Row>
            <CriteriaLocation prefix={`${name}.`} />
          </Row>
        );
      case CriteriaCardTerminalType.SERVICE_POINT:
        return (
          <Row>
            <CriteriaServicePoint prefix={`${name}.`} />
          </Row>
        );
      case CriteriaCardTerminalType.PATRON_GROUP:
        return (
          <Row>
            <CriteriaPatronGroup prefix={`${name}.`} />
          </Row>
        );

      default:
        return <Loading />;
    }
  }, [type]);

  return (
    <Card
      cardClass={css.cardClass}
      headerClass={css.headerClass}
      headerStart={<CriteriaCardSelect prefix={`${name}.`} root={root} />}
      headerEnd={
        <CriteriaCardToolbox
          prefix={`${name}.`}
          root={root}
          alone={alone}
          onRemove={onRemove}
        />
      }
      bodyClass={classNames({
        [css.emptyBody]: type === CriteriaCardTerminalType.PASS,
      })}
    >
      {cardInterior}
    </Card>
  );
}
