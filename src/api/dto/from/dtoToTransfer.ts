import FormValues from '../../../types/FormValues';
import { BursarExportTransferCriteria } from '../types';
import dtoToCriteria from './dtoToCriteria';

// inverse of ../to/transferToDto
export default function dtoToTransfer(
  tokens: BursarExportTransferCriteria
): FormValues['transferInfo'] {
  return {
    conditions:
      tokens.conditions?.map(({ condition, account }) => ({
        condition: dtoToCriteria(condition),
        account,
      })) ?? [],
    else: { account: tokens.else.account },
  };
}
