import { Card, IconButton } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { useField } from 'react-final-form';
import {
  CriteriaCardGroupType,
  CriteriaGroup,
  CriteriaTerminal,
} from '../form/types';

import classNames from 'classnames';
import { useFieldArray } from 'react-final-form-arrays';
import css from './CriteriaCard.module.css';
import CriteriaCardAddButton from './CriteriaCardAddButton';
import CriteriaCardGroupSelect from './CriteriaCardGroupSelect';

export interface CriteriaCardProps {
  prefix: string;
  root?: boolean;
  onRemove?: () => void;
}

export default function CriteriaCard({
  prefix,
  root = false,
  onRemove,
}: CriteriaCardProps) {
  const type = useField<CriteriaCardGroupType>(`${prefix}type`).input.value;
  const criteria = useFieldArray<CriteriaGroup | CriteriaTerminal>(
    `${prefix}criteria`
  );

  const headerEnd = useMemo(() => {
    if (type === CriteriaCardGroupType.PASS) {
      return <div />;
    }

    if (root) {
      return <CriteriaCardAddButton onAdd={criteria.fields.push} />;
    } else {
      return (
        <>
          <CriteriaCardAddButton onAdd={criteria.fields.push} />
          <IconButton icon="trash" onClick={onRemove} />
        </>
      );
    }
  }, [root, prefix, type, criteria, onRemove]);

  return (
    <Card
      headerClass={css.headerClass}
      headerStart={<CriteriaCardGroupSelect prefix={prefix} root={root} />}
      headerEnd={headerEnd}
      cardClass={classNames({
        [css.emptyPassCard]: type === CriteriaCardGroupType.PASS,
      })}
    >
      <div></div>
    </Card>
  );
}
