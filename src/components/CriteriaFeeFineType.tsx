import { Col, Select } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field, useField } from 'react-final-form';
import useFeeFineOwners from '../api/useFeeFineOwners';
import useFeeFineTypes from '../api/useFeeFineTypes';

export default function CriteriaFeeFineType({ prefix }: { prefix: string }) {
  const feeFineOwners = useFeeFineOwners();
  const feeFineTypes = useFeeFineTypes();

  const selectedOwner = useField<string | undefined>(
    `${prefix}feeFineOwnerId`,
    {
      subscription: { value: true },
    }
  ).input.value;

  const ownersSelectOptions = useMemo(() => {
    if (!feeFineOwners.isSuccess) {
      return [];
    }

    return feeFineOwners.data.map((owner) => ({
      label: owner.owner,
      value: owner.id,
    }));
  }, [feeFineOwners]);

  const typeSelectOptions = useMemo(() => {
    if (!selectedOwner || !feeFineTypes.isSuccess) {
      return [];
    }

    return feeFineTypes.data
      .filter((type) => type.ownerId === selectedOwner)
      .map((type) => ({
        label: type.feeFineType,
        value: type.id,
      }));
  }, [selectedOwner, feeFineTypes]);

  return (
    <>
      <Col xs={12} md={6}>
        <Field name={`${prefix}feeFineOwnerId`}>
          {(fieldProps) => (
            <Select<string | undefined>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              label="Fee/fine owner"
              dataOptions={[
                { label: '', value: undefined },
                ...ownersSelectOptions,
              ]}
            />
          )}
        </Field>
      </Col>
      <Col xs={12} md={6}>
        <Field name={`${prefix}feeFineTypeId`}>
          {(fieldProps) => (
            <Select<string | undefined>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              label="Fee/fine type"
              dataOptions={[
                { label: '', value: undefined },
                ...typeSelectOptions,
              ]}
            />
          )}
        </Field>
      </Col>
    </>
  );
}
