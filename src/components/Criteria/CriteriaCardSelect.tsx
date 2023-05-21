import { Select, SelectOptionType } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field } from 'react-final-form';
import {
  CriteriaCardGroupType,
  CriteriaCardTerminalType,
} from '../../types/CriteriaTypes';

export default function CriteriaCardSelect({
  prefix,
  root,
}: {
  prefix: string;
  root: boolean;
}) {
  const selectDefaultValue = useMemo(() => {
    if (root) {
      return CriteriaCardTerminalType.PASS;
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
        value: CriteriaCardTerminalType.PASS,
        disabled: true,
      },

      // TODO: sort these alphabetically per i18n
      {
        label: 'Age',
        value: CriteriaCardTerminalType.AGE,
      },
      {
        label: 'Amount',
        value: CriteriaCardTerminalType.AMOUNT,
      },
      {
        label: 'Fee/fine type',
        value: CriteriaCardTerminalType.FEE_FINE_TYPE,
      },
      {
        label: 'Item location',
        value: CriteriaCardTerminalType.LOCATION,
      },
      {
        label: 'Item service point',
        value: CriteriaCardTerminalType.SERVICE_POINT,
      },
      {
        label: 'Patron group',
        value: CriteriaCardTerminalType.PATRON_GROUP,
      },
    ];

    if (root) {
      options.unshift({
        label: 'No criteria (always run)',
        value: CriteriaCardTerminalType.PASS,
      });
    }

    return options;
  }, [root]);

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
