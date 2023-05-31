import ConvenientConstants from '../../../types/ConvenientConstants';
import FormValues from '../../../types/FormValues';
import {
  DataToken,
  DataTokenType,
  DateFormatType,
} from '../../../types/TokenTypes';
import {
  BursarExportDataTokenDTO,
  BursarExportTokenAggregate,
  BursarExportTokenConstant,
  BursarExportTransferCriteria,
} from '../types';
import dtoToCriteria from './dtoToCriteria';
import dtoToLengthControl from './dtoToLengthControl';

// inverse of ../to/transferToDto
export default function dtoToTransfer(
  tokens: BursarExportTransferCriteria
): FormValues['transferInfo'] {
  return {
    conditions: tokens.conditions.map(({ condition, account }) => ({
      condition: dtoToCriteria(condition),
      account,
    })),
    else: { account: tokens.else.account },
  };
}
