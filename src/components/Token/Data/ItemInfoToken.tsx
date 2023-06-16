import React, { useMemo } from 'react';
import { ItemAttribute } from '../../../types/TokenTypes';
import UserItemInfoToken from './UserItemInfoToken';
import { useIntl } from 'react-intl';

export default function ItemInfoToken({ prefix }: { prefix: string }) {
  const intl = useIntl();
  const options = useMemo(() => {
    const selectOptions = [
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.name',
        }),
        value: 'NAME' as ItemAttribute,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.barcode',
        }),
        value: 'BARCODE' as ItemAttribute,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.material',
        }),
        value: 'MATERIAL_TYPE' as ItemAttribute,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.instId',
        }),
        value: 'INSTITUTION_ID' as ItemAttribute,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.campId',
        }),
        value: 'CAMPUS_ID' as ItemAttribute,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.libId',
        }),
        value: 'LIBRARY_ID' as ItemAttribute,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.itemInfo.locId',
        }),
        value: 'LOCATION_ID' as ItemAttribute,
      },
    ].sort((a, b) => a.label.localeCompare(b.label));
    return selectOptions;
  }, [intl]);

  return (
    <UserItemInfoToken<ItemAttribute>
      prefix={prefix}
      defaultValue="NAME"
      attributeName="itemAttribute"
      options={options}
    />
  );
}
