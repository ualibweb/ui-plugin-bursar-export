import { Col, Row, Select } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field, useField } from 'react-final-form';
import useFeeFineOwners from '../api/useFeeFineOwners';
import useTransferAccounts from '../api/useTransferAccounts';

export default function TransferAccountFields({ prefix }: { prefix: string }) {
  const feeFineOwners = useFeeFineOwners();
  const transferAccounts = useTransferAccounts();

  const selectedOwner = useField<string | undefined>(`${prefix}owner`, {
    subscription: { value: true },
    // provide default value for when the field is not yet initialized
    format: (value) => value,
  }).input.value;

  const ownersSelectOptions = useMemo(() => {
    if (!feeFineOwners.isSuccess) {
      return [];
    }

    return feeFineOwners.data.map((owner) => ({
      label: owner.owner,
      value: owner.id,
    }));
  }, [feeFineOwners]);

  const accountSelectOptions = useMemo(() => {
    if (!transferAccounts.isSuccess || !selectedOwner) {
      return [];
    }

    return transferAccounts.data
      .filter((type) => type.ownerId === selectedOwner)
      .map((type) => ({
        label: type.accountName,
        value: type.id,
      }));
  }, [selectedOwner, transferAccounts]);

  return (
    <Row>
      <Col xs={12} md={6}>
        <Field name={`${prefix}owner`}>
          {(fieldProps) => (
            <Select<string | undefined>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              label="Fee/fine owner"
              dataOptions={[
                { label: '', value: undefined, disabled: true },
                ...ownersSelectOptions,
              ]}
            />
          )}
        </Field>
      </Col>
      <Col xs={12} md={6}>
        <Field name={`${prefix}account`}>
          {(fieldProps) => (
            <Select<string | undefined>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              label="Transfer account"
              dataOptions={[
                { label: '', value: undefined },
                ...accountSelectOptions,
              ]}
            />
          )}
        </Field>
      </Col>
    </Row>
  );
}
