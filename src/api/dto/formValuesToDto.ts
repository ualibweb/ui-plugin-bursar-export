import FormValues from '../../types/FormValues';
import aggregateCriteriaToFilterDto from './aggregateCriteriaToFilterDto';
import criteriaToFilterDto from './criteriaToFilterDto';
import { BursarExportJobDTO } from './types';

export default function formValuesToDto(
  values: FormValues
): BursarExportJobDTO {
  if (values.aggregate) {
    return {
      filter: criteriaToFilterDto(values.criteria),
      groupByPatron: true,
      groupByPatronFilter: aggregateCriteriaToFilterDto(values.aggregateFilter),

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
  } else {
    return {
      filter: criteriaToFilterDto(values.criteria),
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
}
