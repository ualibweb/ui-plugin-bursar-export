import { Col, Select } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field } from 'react-final-form';
import usePatronGroups from '../../api/queries/usePatronGroups';

export default function CriteriaPatronGroup({ prefix }: { prefix: string }) {
  const patronGroups = usePatronGroups();

  const selectOptions = useMemo(() => {
    if (!patronGroups.isSuccess) {
      return [];
    }

    return patronGroups.data.map((sp) => ({
      label: sp.group,
      value: sp.id,
    }));
  }, [patronGroups]);

  return (
    <Col xs={12}>
      <Field name={`${prefix}patronGroupId`}>
        {(fieldProps) => (
          <Select<string | undefined>
            {...fieldProps}
            fullWidth
            marginBottom0
            required
            label="Patron group"
            dataOptions={[{ label: '', value: undefined }, ...selectOptions]}
          />
        )}
      </Field>
    </Col>
  );
}
