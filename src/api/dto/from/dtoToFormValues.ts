import FormValues from '../../../types/FormValues';
import { LocaleWeekdayInfo } from '../../../utils/WeekdayUtils';
import { SavedJobDTO } from '../types';
import dtoToAggregateCriteria from './dtoToAggregateCriteria';
import dtoToCriteria from './dtoToCriteria';
import dtoToData from './dtoToData';
import dtoToHeaderFooter from './dtoToHeaderFooter';
import dtoToScheduling from './dtoToScheduling';

export default function dtoToFormValues(
  values: SavedJobDTO | null,
  localeWeekdays: LocaleWeekdayInfo[]
): Partial<FormValues> {
  if (values === null) return {};

  if (values.exportTypeSpecificParameters.bursarFeeFines.groupByPatron) {
    return {
      scheduling: dtoToScheduling(values, localeWeekdays),

      criteria: dtoToCriteria(
        values.exportTypeSpecificParameters.bursarFeeFines.filter
      ),

      aggregate: true,
      aggregateFilter: dtoToAggregateCriteria(
        values.exportTypeSpecificParameters.bursarFeeFines.groupByPatronFilter
      ),

      header: dtoToHeaderFooter(
        values.exportTypeSpecificParameters.bursarFeeFines.header
      ),
      dataAggregate: dtoToData(
        values.exportTypeSpecificParameters.bursarFeeFines.data
      ),
      footer: dtoToHeaderFooter(
        values.exportTypeSpecificParameters.bursarFeeFines.header
      ),
    };
  } else {
    return {
      scheduling: dtoToScheduling(values, localeWeekdays),

      criteria: dtoToCriteria(
        values.exportTypeSpecificParameters.bursarFeeFines.filter
      ),

      aggregate: false,

      header: dtoToHeaderFooter(
        values.exportTypeSpecificParameters.bursarFeeFines.header
      ),
      data: dtoToData(values.exportTypeSpecificParameters.bursarFeeFines.data),
      footer: dtoToHeaderFooter(
        values.exportTypeSpecificParameters.bursarFeeFines.header
      ),
    };
  }
}
