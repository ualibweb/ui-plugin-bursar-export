import { Select, SelectOptionType } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field } from 'react-final-form';
import {
  CriteriaGroupType,
  CriteriaTerminalType,
} from '../../types/CriteriaTypes';

export default function CriteriaCardSelect({
  name,
  root,
}: {
  name: string;
  root: boolean;
}) {
  const selectDefaultValue = useMemo(() => {
    if (root) {
      return CriteriaTerminalType.PASS;
    } else {
      return CriteriaGroupType.ALL_OF;
    }
  }, [root]);

  const selectOptions = useMemo(() => {
    const options: SelectOptionType<
      CriteriaGroupType | CriteriaTerminalType
    >[] = [
      {
        label: 'All of:',
        value: CriteriaGroupType.ALL_OF,
      },
      {
        label: 'Any of:',
        value: CriteriaGroupType.ANY_OF,
      },
      {
        label: 'None of:',
        value: CriteriaGroupType.NONE_OF,
      },

      {
        label: '',
        value: CriteriaTerminalType.PASS,
        disabled: true,
      },

      // TODO: sort these alphabetically per i18n
      {
        label: 'Age',
        value: CriteriaTerminalType.AGE,
      },
      {
        label: 'Amount',
        value: CriteriaTerminalType.AMOUNT,
      },
      {
        label: 'Fee/fine type',
        value: CriteriaTerminalType.FEE_FINE_TYPE,
      },
      {
        label: 'Item location',
        value: CriteriaTerminalType.LOCATION,
      },
      {
        label: 'Item service point',
        value: CriteriaTerminalType.SERVICE_POINT,
      },
      {
        label: 'Patron group',
        value: CriteriaTerminalType.PATRON_GROUP,
      },
    ];

    if (root) {
      options.unshift({
        label: 'No criteria (always run)',
        value: CriteriaTerminalType.PASS,
      });
    }

    return options;
  }, [root]);

  return (
    <Field name={name} defaultValue={selectDefaultValue}>
      {(fieldProps) => (
        <Select<CriteriaGroupType | CriteriaTerminalType>
          {...fieldProps}
          required
          marginBottom0
          dataOptions={selectOptions}
        />
      )}
    </Field>
  );
}
