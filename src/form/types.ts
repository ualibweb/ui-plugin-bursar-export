export interface FormValues {
  scheduling: {
    frequency: SchedulingFrequency;
    interval?: number;
  };
  criteria: CriteriaGroup;
}

export enum SchedulingFrequency {
  Manual = 'NONE',
  Hours = 'HOUR',
  Days = 'DAY',
  Weeks = 'WEEK',
}

export interface CriteriaGroup {
  type: CriteriaCardGroupType;
  criteria?: (CriteriaGroup | CriteriaTerminal)[];
}

export enum ComparisonOperator {
  LESS_THAN_EQUAL = 'LESS_THAN_EQUAL',
  LESS_THAN = 'LESS_THAN',
  GREATER_THAN_EQUAL = 'GREATER_THAN_EQUAL',
  GREATER_THAN = 'GREATER_THAN',
}

export type CriteriaTerminal =
  | {
      type: CriteriaCardTerminalType.AGE;
      numDays?: number;
    }
  | {
      type: CriteriaCardTerminalType.AMOUNT;
      operator?: ComparisonOperator;
      amountDollars?: number;
    }
  | {
      type: CriteriaCardTerminalType.FEE_FINE_TYPE;
      feeFineOwnerId?: string;
      feeFineTypeId?: string;
    };

export enum CriteriaCardGroupType {
  ALL_OF = 'Condition-AND',
  ANY_OF = 'Condition-OR',
  NONE_OF = 'Condition-NOR',
  PASS = '',
}

export enum CriteriaCardTerminalType {
  AGE = 'Age',
  AMOUNT = 'Amount',
  FEE_FINE_TYPE = 'FeeType',
}
