import {
  Col,
  MultiSelection,
  MultiSelectionDefaultOptionType,
  Row,
  Select,
  TextField,
  Timepicker,
} from '@folio/stripes/components';
import React from 'react';
import { Field, useField } from 'react-final-form';
import { useIntl } from 'react-intl';
import { Weekday, useLocaleWeekdays } from '../../utils/WeekdayUtils';
import { SchedulingFrequency } from '../types';

export function getIntervalLabel(frequency: SchedulingFrequency) {
  switch (frequency) {
    case SchedulingFrequency.Hours:
      return 'Hours between runs';
    case SchedulingFrequency.Days:
      return 'Days between runs';
    case SchedulingFrequency.Weeks:
      return 'Weeks between runs';
    default:
      return '';
  }
}

export default function SchedulingMenu() {
  const frequencyValue = useField<SchedulingFrequency>('scheduling.frequency')
    .input.value;

  const localeWeekdays = useLocaleWeekdays(useIntl());

  return (
    <Row>
      <Col xs={12} md={6}>
        <Field
          name="scheduling.frequency"
          defaultValue={SchedulingFrequency.Manual}
        >
          {(fieldProps) => (
            <Select<SchedulingFrequency>
              {...fieldProps}
              fullWidth
              required
              label="Frequency"
              dataOptions={[
                {
                  label: 'Never (run manually)',
                  value: SchedulingFrequency.Manual,
                },
                {
                  label: 'Hours',
                  value: SchedulingFrequency.Hours,
                },
                {
                  label: 'Days',
                  value: SchedulingFrequency.Days,
                },
                {
                  label: 'Weeks',
                  value: SchedulingFrequency.Weeks,
                },
              ]}
            />
          )}
        </Field>
      </Col>
      {[
        SchedulingFrequency.Hours,
        SchedulingFrequency.Days,
        SchedulingFrequency.Weeks,
      ].includes(frequencyValue) && (
        <Col xs={12} md={6}>
          <Field name="scheduling.interval">
            {(fieldProps) => (
              <TextField<number>
                {...fieldProps}
                fullWidth
                required
                label={getIntervalLabel(frequencyValue)}
                min={1}
              />
            )}
          </Field>
        </Col>
      )}
      {[SchedulingFrequency.Days, SchedulingFrequency.Weeks].includes(
        frequencyValue
      ) && (
        <Col xs={12} md={6}>
          <Field name="scheduling.time">
            {(fieldProps) => (
              <Timepicker {...fieldProps} required label="Run at" />
            )}
          </Field>
        </Col>
      )}
      {frequencyValue === SchedulingFrequency.Weeks && (
        <Col xs={12} md={6}>
          <Field name={`scheduling.weekdays`}>
            {(fieldProps) => (
              <MultiSelection<MultiSelectionDefaultOptionType<Weekday>>
                {...fieldProps}
                label="Run on weekdays"
                dataOptions={localeWeekdays.map((weekday) => ({
                  label: weekday.long,
                  value: weekday.weekday,
                }))}
              />
            )}
          </Field>
        </Col>
      )}
    </Row>
  );
}
