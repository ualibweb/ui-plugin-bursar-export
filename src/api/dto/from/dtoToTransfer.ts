import FormValues from '../../../types/FormValues';
import { TransferAccountDTO } from '../../queries/useTransferAccounts';
import { BursarExportTransferCriteria } from '../types';
import dtoToCriteria from './dtoToCriteria';

// inverse of ../to/transferToDto
export default function dtoToTransfer(
  tokens: BursarExportTransferCriteria,
  transferAccounts: TransferAccountDTO[]
): FormValues['transferInfo'] {
  return {
    conditions:
      tokens.conditions?.map(({ condition, account }) => ({
        condition: dtoToCriteria(condition),
        owner: getOwnerForAccount(transferAccounts, tokens.else.account),
        account,
      })) ?? [],
    else: {
      owner: getOwnerForAccount(transferAccounts, tokens.else.account),
      account: tokens.else.account,
    },
  };
}

export function getOwnerForAccount(
  transferAccounts: TransferAccountDTO[],
  accountId: string
) {
  return transferAccounts.find((type) => type.id === accountId)?.ownerId;
}
