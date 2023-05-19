import { IconButton } from '@folio/stripes/components';
import React, { useCallback } from 'react';
import { useField } from 'react-final-form';
import { useFieldArray } from 'react-final-form-arrays';
import {
  CriteriaCardGroupType,
  CriteriaCardTerminalType,
  CriteriaGroup,
  CriteriaTerminal,
} from '../form/types';

export interface CriteriaCardToolboxProps {
  prefix: string;
  root: boolean;
  alone: boolean;
  onRemove?: () => void;
}

export default function CriteriaCardToolbox({
  prefix,
  root = false,
  alone = false,
  onRemove,
}: CriteriaCardToolboxProps) {
  const type =
    useField<CriteriaCardGroupType | CriteriaCardTerminalType>(`${prefix}type`)
      .input.value ?? CriteriaCardGroupType.PASS;
  const criteria = useFieldArray<CriteriaGroup | CriteriaTerminal>(
    `${prefix}criteria`
  );

  const addCallback = useCallback(() => {
    criteria.fields.push({
      type: CriteriaCardGroupType.ALL_OF,
      criteria: [],
    });
  }, [criteria]);

  return (
    <div>
      {(
        [
          CriteriaCardGroupType.ALL_OF,
          CriteriaCardGroupType.ANY_OF,
          CriteriaCardGroupType.NONE_OF,
        ] as (CriteriaCardGroupType | CriteriaCardTerminalType)[]
      ).includes(type) && <IconButton icon="plus-sign" onClick={addCallback} />}
      {!root && <IconButton icon="trash" onClick={onRemove} disabled={alone} />}
    </div>
  );
}
