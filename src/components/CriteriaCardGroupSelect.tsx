import {
  Card,
  IconButton,
  Select,
  SelectOptionType,
} from '@folio/stripes/components';
import React, { useEffect, useMemo } from 'react';
import { Field, useField, useForm } from 'react-final-form';
import {
  CriteriaCardGroupType,
  CriteriaCardTerminalType,
  CriteriaGroup,
  CriteriaTerminal,
  FormValues,
} from '../form/types';

import css from './CriteriaCard.module.css';
import CriteriaCardAddButton from './CriteriaCardAddButton';
import { useFieldArray } from 'react-final-form-arrays';
import classNames from 'classnames';

export default function CriteriaCardGroupSelect({
  prefix,
  root,
}: {
  prefix: string;
  root: boolean;
}) {
  const form = useForm();
  const type = useField<CriteriaCardGroupType>(`${prefix}type`).input.value;
  const criteria = useFieldArray<CriteriaGroup | CriteriaTerminal>(
    `${prefix}criteria`
  );

  const selectDefaultValue = useMemo(() => {
    if (root) {
      return CriteriaCardGroupType.PASS;
    } else {
      return CriteriaCardGroupType.ALL_OF;
    }
  }, [root]);

  const selectOptions = useMemo(() => {
    const options: SelectOptionType<CriteriaCardGroupType>[] = [
      {
        label: 'All of:',
        value: CriteriaCardGroupType.ALL_OF,
      },
      {
        label: 'Any of:',
        value: CriteriaCardGroupType.ANY_OF,
      },
      {
        label: 'None of:',
        value: CriteriaCardGroupType.NONE_OF,
      },
    ];

    if (root) {
      options.unshift({
        label: 'No criteria (always run)',
        value: CriteriaCardGroupType.PASS,
      });
    }

    return options;
  }, [root]);

  useEffect(() => {
    if (type === CriteriaCardGroupType.PASS && criteria.fields.length) {
      // remove conditions if changed to pass
      form.change(`${prefix}criteria`, []);
    } else if (
      type !== CriteriaCardGroupType.PASS &&
      criteria.fields.length === 0
    ) {
      // ensure at least one inner condition
      form.change(`${prefix}criteria`, [
        { type: CriteriaCardTerminalType.AGE },
      ]);
    }
  }, [type]);

  return (
    <Field name={`${prefix}type`} defaultValue={selectDefaultValue}>
      {(fieldProps) => (
        <Select<CriteriaCardGroupType>
          {...fieldProps}
          required
          marginBottom0
          dataOptions={selectOptions}
        />
      )}
    </Field>
  );
}
