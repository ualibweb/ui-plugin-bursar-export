import FormValues from '../../types/FormValues';
import aggregateCriteriaToFilterDto from './aggregateCriteriaToFilterDto';
import criteriaToFilterDto from './criteriaToFilterDto';
import headerFooterToDto from './headerFooterToDto';
import { BursarExportJobDTO } from './types';

export default function formValuesToDto(
  values: FormValues
): BursarExportJobDTO {
  if (values.aggregate) {
    return {
      filter: criteriaToFilterDto(values.criteria),
      groupByPatron: true,
      groupByPatronFilter: aggregateCriteriaToFilterDto(values.aggregateFilter),

      header: headerFooterToDto(values.header),
      data: [],
      footer: headerFooterToDto(values.footer),
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

      header: headerFooterToDto(values.header),
      data: [],
      footer: headerFooterToDto(values.footer),
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
