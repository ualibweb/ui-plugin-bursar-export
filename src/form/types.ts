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

export interface CriteriaTerminal {
  type: CriteriaCardTerminalType;
}

export enum CriteriaCardGroupType {
  ALL_OF = 'Condition-AND',
  ANY_OF = 'Condition-OR',
  NONE_OF = 'Condition-NOR',
  PASS = 'Pass',
}

export enum CriteriaCardTerminalType {
  AGE = 'Age',
  AMOUNT = 'Amount',
}
