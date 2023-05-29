import React from 'react';
import { ItemAttribute } from '../../../types/TokenTypes';
import UserItemInfoToken from './UserItemInfoToken';

export default function ItemInfoToken({ prefix }: { prefix: string }) {
  return (
    <UserItemInfoToken<ItemAttribute>
      prefix={prefix}
      defaultValue="NAME"
      attributeName="itemAttribute"
      options={[
        {
          label: 'Name',
          value: 'NAME',
        },
        {
          label: 'Barcode',
          value: 'BARCODE',
        },
        {
          label: 'Material type',
          value: 'MATERIAL_TYPE',
        },
        {
          label: 'Institution ID',
          value: 'INSTITUTION_ID',
        },
        {
          label: 'Campus ID',
          value: 'CAMPUS_ID',
        },
        {
          label: 'Library ID',
          value: 'LIBRARY_ID',
        },
        {
          label: 'Location ID',
          value: 'LOCATION_ID',
        },
      ]}
    />
  );
}
