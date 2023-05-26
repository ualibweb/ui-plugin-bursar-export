import FormValues from '../../types/FormValues';
import criteriaToFilterDto from './criteriaToFilterDto';
import { BursarExportTransferCriteria } from './types';

export default function transferToDto(
  transferInfo: FormValues['transferInfo']
): BursarExportTransferCriteria {
  return {
    conditions: (transferInfo?.conditions ?? []).map(
      ({ condition, account }) => ({
        condition: criteriaToFilterDto(condition),
        account: account ?? '',
      })
    ),
    else: { account: transferInfo?.else?.account ?? '' },
  };
}
