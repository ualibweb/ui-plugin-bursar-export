import { Select, SelectOptionType } from '@folio/stripes/components';
import React, { useEffect, useMemo } from 'react';
import { Field, useField, useForm } from 'react-final-form';
import {
  CriteriaCardGroupType,
  CriteriaCardTerminalType,
  CriteriaGroup,
  CriteriaTerminal,
} from '../form/types';
import { useFieldArray } from 'react-final-form-arrays';

export default function CriteriaCardSelect({
  prefix,
  root,
}: {
  prefix: string;
  root: boolean;
}) {
  const form = useForm();
  const type = useField<CriteriaCardGroupType | CriteriaCardTerminalType>(
    `${prefix}type`
  ).input.value;
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
    const options: SelectOptionType<
      CriteriaCardGroupType | CriteriaCardTerminalType
    >[] = [
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

      {
        label: '',
        value: CriteriaCardGroupType.PASS,
        disabled: true,
      },

      {
        label: 'Age',
        value: CriteriaCardTerminalType.AGE,
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
    }
  }, [type]);

  return (
    <Field name={`${prefix}type`} defaultValue={selectDefaultValue}>
      {(fieldProps) => (
        <Select<CriteriaCardGroupType | CriteriaCardTerminalType>
          {...fieldProps}
          required
          marginBottom0
          dataOptions={selectOptions}
        />
      )}
    </Field>
  );
}
