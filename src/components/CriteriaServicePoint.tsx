import { Col, Select } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field } from 'react-final-form';
import useServicePoints from '../api/useServicePoints';

export default function CriteriaServicePoint({ prefix }: { prefix: string }) {
  const servicePoints = useServicePoints();

  const selectOptions = useMemo(() => {
    if (!servicePoints.isSuccess) {
      return [];
    }

    return servicePoints.data.map((sp) => ({
      label: sp.name,
      value: sp.id,
    }));
  }, [servicePoints]);

  return (
    <Col xs={12} md={6}>
      <Field name={`${prefix}servicePointId`}>
        {(fieldProps) => (
          <Select<string | undefined>
            {...fieldProps}
            fullWidth
            marginBottom0
            required
            label="Service point"
            dataOptions={[{ label: '', value: undefined }, ...selectOptions]}
          />
        )}
      </Field>
    </Col>
  );
}
