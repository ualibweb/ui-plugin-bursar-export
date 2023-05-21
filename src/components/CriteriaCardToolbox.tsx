import { IconButton } from '@folio/stripes/components';
import React, { useCallback } from 'react';
import { useField } from 'react-final-form';
import { useFieldArray } from 'react-final-form-arrays';
import {
  CriteriaCardGroupType,
  CriteriaCardTerminalType,
  CriteriaGroup,
  CriteriaTerminal,
} from '../types/CriteriaTypes';

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
  const type = useField<CriteriaCardGroupType | CriteriaCardTerminalType>(
    `${prefix}type`,
    // format ensures undefined is treated as default (pass)
    {
      subscription: { value: true },
      format: (value) => value || CriteriaCardTerminalType.PASS,
    }
  ).input.value;
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
