import { CriteriaGroup, CriteriaTerminal } from '../../types/CriteriaTypes';
import { BursarExportFilterAge, BursarExportJobDTO } from './types';

export default function criteriaToFilterDto(
  criteria: CriteriaGroup | CriteriaTerminal
): BursarExportJobDTO['filter'] {
  return { type: 'Pass' };
}
