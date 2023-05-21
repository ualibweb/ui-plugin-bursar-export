import { Col, Select } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field } from 'react-final-form';
import { useIntl } from 'react-intl';
import { DateFormatType } from '../../../types/TokenTypes';
import timeZones from '../../../utils/timezones';

export default function CurrentDateToken({ prefix }: { prefix: string }) {
  const intl = useIntl();

  const timeZonesForSelect = useMemo(
    () => timeZones.map(({ value }) => ({ value, label: value })),
    [timeZones]
  );

  return (
    <>
      <Col xs={6}>
        <Field name={`${prefix}format`} defaultValue={DateFormatType.YEAR_LONG}>
          {(fieldProps) => (
            <Select<DateFormatType>
              {...fieldProps}
              required
              marginBottom0
              label="Format"
              dataOptions={[
                {
                  label: 'Year (4-digit)',
                  value: DateFormatType.YEAR_LONG,
                },
                {
                  label: 'Year (2-digit)',
                  value: DateFormatType.YEAR_SHORT,
                },
                {
                  label: 'Month',
                  value: DateFormatType.MONTH,
                },
                {
                  label: 'Day of month',
                  value: DateFormatType.DATE,
                },
                {
                  label: 'Hour',
                  value: DateFormatType.HOUR,
                },
                {
                  label: 'Minute',
                  value: DateFormatType.MINUTE,
                },
                {
                  label: 'Second',
                  value: DateFormatType.SECOND,
                },

                {
                  label: 'Quarter',
                  value: DateFormatType.QUARTER,
                },
                {
                  label: 'ISO week number',
                  value: DateFormatType.WEEK_OF_YEAR_ISO,
                },
                {
                  label: 'ISO week year',
                  value: DateFormatType.WEEK_YEAR_ISO,
                },
              ]}
            />
          )}
        </Field>
      </Col>
      <Col xs={6}>
        <Field name={`${prefix}timezone`} defaultValue={intl.timeZone ?? 'UTC'}>
          {(fieldProps) => (
            <Select<string>
              {...fieldProps}
              required
              marginBottom0
              label="Timezone"
              dataOptions={timeZonesForSelect}
            />
          )}
        </Field>
      </Col>
    </>
  );
}
