export interface FormValues {
  scheduling: {
    frequency: SchedulingFrequency;
    interval?: number;
  };
}

export enum SchedulingFrequency {
  Manual = 'NONE',
  Hours = 'HOUR',
  Days = 'DAY',
  Weeks = 'WEEK',
}
