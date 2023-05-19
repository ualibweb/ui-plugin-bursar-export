import { Card, Loading, Row } from '@folio/stripes/components';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useField } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { CriteriaCardGroupType, CriteriaCardTerminalType } from '../form/types';
import CriteriaAge from './CriteriaAge';
import css from './CriteriaCard.module.css';
import CriteriaCardSelect from './CriteriaCardSelect';
import CriteriaCardToolbox from './CriteriaCardToolbox';

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
  >(`${name}.type`).input.value;

  const cardInterior = useMemo(() => {
    switch (type) {
      case CriteriaCardGroupType.PASS:
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
        return <CriteriaAge prefix={`${name}.`} />;

      default:
        return <Loading />;
    }
  }, [type]);

  return (
    <Card
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
        [css.emptyBody]: type === CriteriaCardGroupType.PASS,
      })}
    >
      <Row>{cardInterior}</Row>
    </Card>
  );
}
