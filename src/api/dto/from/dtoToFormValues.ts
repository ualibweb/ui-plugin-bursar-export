import FormValues from '../../../types/FormValues';
import { LocaleWeekdayInfo } from '../../../utils/WeekdayUtils';
import { SavedJobDTO } from '../types';
import dtoToAggregateCriteria from './dtoToAggregateCriteria';
import dtoToCriteria from './dtoToCriteria';
import dtoToScheduling from './dtoToScheduling';

export default function dtoToFormValues(
  values: SavedJobDTO | null,
  localeWeekdays: LocaleWeekdayInfo[]
): Partial<FormValues> {
  if (values === null) return {};

  return {
    scheduling: dtoToScheduling(values, localeWeekdays),
    criteria: dtoToCriteria(
      values.exportTypeSpecificParameters.bursarFeeFines.filter
    ),
    aggregate: values.exportTypeSpecificParameters.bursarFeeFines.groupByPatron,
    aggregateFilter: dtoToAggregateCriteria(
      values.exportTypeSpecificParameters.bursarFeeFines.groupByPatronFilter
    ),
  };
}
