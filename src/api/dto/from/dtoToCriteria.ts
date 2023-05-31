import {
  ComparisonOperator,
  CriteriaGroup,
  CriteriaGroupType,
  CriteriaTerminal,
  CriteriaTerminalType,
} from '../../../types/CriteriaTypes';
import {
  BursarExportFilterCondition,
  BursarExportFilterDTO,
  BursarExportFilterNegation,
} from '../types';

// inverse of ../to/criteriaToFilterDto
export default function dtoToCriteria(
  filter: BursarExportFilterDTO
): CriteriaGroup | CriteriaTerminal {
  switch (filter.type) {
    case 'Age':
      return {
        type: CriteriaTerminalType.AGE,
        numDays: filter.numDays.toString(),
      };
    case 'Amount':
      return {
        type: CriteriaTerminalType.AMOUNT,
        operator: filter.condition as ComparisonOperator,
        amountDollars: (filter.amount / 100).toFixed(),
      };
    case 'FeeType':
      return {
        type: CriteriaTerminalType.FEE_FINE_TYPE,
        feeFineTypeId: filter.feeFineTypeId,
      };
    case 'Location':
      return {
        type: CriteriaTerminalType.LOCATION,
        locationId: filter.locationId,
      };
    case 'PatronGroup':
      return {
        type: CriteriaTerminalType.PATRON_GROUP,
        patronGroupId: filter.patronGroupId,
      };
    case 'ServicePoint':
      return {
        type: CriteriaTerminalType.SERVICE_POINT,
        servicePointId: filter.servicePointId,
      };

    case 'Condition':
      return dtoToConditionCriteria(filter);

    case 'Negation':
      return dtoToNegationCriteria(filter);

    case 'Pass':
    default:
      return {
        type: CriteriaTerminalType.PASS,
      };
  }
}

export function dtoToConditionCriteria(
  filter: BursarExportFilterCondition
): CriteriaGroup {
  if (filter.operation === 'AND') {
    return {
      type: CriteriaGroupType.ALL_OF,
      criteria: filter.criteria.map(dtoToCriteria),
    };
  } else {
    return {
      type: CriteriaGroupType.ANY_OF,
      criteria: filter.criteria.map(dtoToCriteria),
    };
  }
}

export function dtoToNegationCriteria(
  filter: BursarExportFilterNegation
): CriteriaGroup {
  // NOR gets displayed as "None of" in the UI, so we flatten the inner OR
  if (
    filter.criteria.type === 'Condition' &&
    filter.criteria.operation === 'OR'
  ) {
    return {
      type: CriteriaGroupType.NONE_OF,
      criteria: filter.criteria.criteria.map(dtoToCriteria),
    };
  }

  // otherwise, just negate the single inner criteria
  return {
    type: CriteriaGroupType.NONE_OF,
    criteria: [dtoToCriteria(filter.criteria)],
  };
}
