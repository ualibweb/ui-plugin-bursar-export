import React, { useMemo } from 'react';
import UserItemInfoToken from './UserItemInfoToken';
import { useIntl } from 'react-intl';
import { UserAttribute } from '../../../types/TokenTypes';

export default function UserInfoToken({ prefix }: { prefix: string }) {
  const intl = useIntl();

  const options = useMemo(() => {
    const selectOptions = [
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.userInfo.folioId',
        }),
        value: 'FOLIO_ID' as UserAttribute,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.userInfo.extId',
        }),
        value: 'EXTERNAL_SYSTEM_ID' as UserAttribute,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.userInfo.groupId',
        }),
        value: 'PATRON_GROUP_ID' as UserAttribute,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.userInfo.barcode',
        }),
        value: 'BARCODE' as UserAttribute,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.userInfo.username',
        }),
        value: 'USERNAME' as UserAttribute,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.userInfo.firstname',
        }),
        value: 'FIRST_NAME' as UserAttribute,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.userInfo.middlename',
        }),
        value: 'MIDDLE_NAME' as UserAttribute,
      },
      {
        label: intl.formatMessage({
          id: 'ui-plugin-bursar-export.bursarExports.token.userInfo.lastname',
        }),
        value: 'LAST_NAME' as UserAttribute,
      },
    ];
    return selectOptions;
  }, [intl]);

  return (
    <UserItemInfoToken<UserAttribute>
      prefix={prefix}
      defaultValue="EXTERNAL_SYSTEM_ID"
      attributeName="userAttribute"
      options={options}
    />
  );
}
