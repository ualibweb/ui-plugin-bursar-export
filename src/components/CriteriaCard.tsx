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
  CriteriaGroup,
  CriteriaTerminal,
  FormValues,
} from '../form/types';

import css from './CriteriaCard.module.css';
import CriteriaCardAddButton from './CriteriaCardAddButton';
import { useFieldArray } from 'react-final-form-arrays';

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
  const selectDefaultValue = useMemo(() => {
    if (root) {
      return CriteriaCardGroupType.PASS;
    } else {
      return CriteriaCardGroupType.ALL_OF;
    }
  }, [root]);

  const form = useForm();
  const type = useField<CriteriaCardGroupType>(`${prefix}type`).input.value;
  const criteria = useFieldArray<CriteriaGroup | CriteriaTerminal>(
    `${prefix}criteria`
  );

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
      form.change(`${prefix}criteria`, []);
    }
  }, [type]);

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
      headerStart={
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
      }
      headerEnd={headerEnd}
    >
      card contents
    </Card>
  );
}
