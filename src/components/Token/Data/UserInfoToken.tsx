import React from 'react';
import { UserAttribute } from '../../../types/TokenTypes';
import UserItemInfoToken from './UserItemInfoToken';

export default function UserInfoToken({ prefix }: { prefix: string }) {
  return (
    <UserItemInfoToken<UserAttribute>
      prefix={prefix}
      defaultValue="EXTERNAL_SYSTEM_ID"
      options={[
        {
          label: 'Folio ID',
          value: 'FOLIO_ID',
        },
        {
          label: 'External system ID',
          value: 'EXTERNAL_SYSTEM_ID',
        },
        {
          label: 'Patron group ID',
          value: 'PATRON_GROUP_ID',
        },
        {
          label: 'Barcode',
          value: 'BARCODE',
        },
        {
          label: 'Username',
          value: 'USERNAME',
        },
        {
          label: 'First name',
          value: 'FIRST_NAME',
        },
        {
          label: 'Middle name',
          value: 'MIDDLE_NAME',
        },
        {
          label: 'Last name',
          value: 'LAST_NAME',
        },
      ]}
    />
  );
}
