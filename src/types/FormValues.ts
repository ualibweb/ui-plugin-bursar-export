import { CriteriaGroup, CriteriaTerminal } from './CriteriaTypes';
import SchedulingFrequency from './SchedulingFrequency';

export default interface FormValues {
  scheduling: {
    frequency: SchedulingFrequency;
    interval?: number;
  };
  criteria: CriteriaGroup | CriteriaTerminal;
}
