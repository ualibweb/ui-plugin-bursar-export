import FormValues from '../../types/FormValues';
import criteriaToFilterDto from './criteriaToFilterDto';
import { BursarExportJobDTO } from './types';

export default function formValuesToDto(
  values: FormValues
): BursarExportJobDTO {
  return {
    filter: criteriaToFilterDto(values.criteria),

    // TODO: real values
    groupByPatron: false,
    header: [],
    data: [],
    footer: [],
    transferInfo: {
      conditions: [],
      else: { account: '' },
    },
    // groupByPatron: values.groupByPatron,
    // groupByPatronFilter: values.groupByPatronFilter,
    // header: values.header,
    // data: values.data,
    // footer: values.footer,
    // transferInfo: values.transferInfo,
  };
}
