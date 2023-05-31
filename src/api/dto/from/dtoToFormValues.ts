import { IntlShape } from 'react-intl';
import FormValues from '../../../types/FormValues';
import { SchedulingDTO } from '../types';
import dtoToScheduling from './dtoToScheduling';
import { LocaleWeekdayInfo } from '../../../utils/WeekdayUtils';

export default function dtoToFormValues(
  values: Required<SchedulingDTO> | null,
  localeWeekdays: LocaleWeekdayInfo[]
): Partial<FormValues> {
  if (values === null) return {};

  return {
    scheduling: dtoToScheduling(values, localeWeekdays),
  };
}
