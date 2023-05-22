import { CriteriaGroup, CriteriaTerminal } from './CriteriaTypes';
import SchedulingFrequency from './SchedulingFrequency';
import { DataToken, HeaderFooterToken } from './TokenTypes';

export default interface FormValues {
  scheduling: {
    frequency: SchedulingFrequency;
    interval?: number;
  };
  criteria: CriteriaGroup | CriteriaTerminal;
  header?: HeaderFooterToken[];
  data?: DataToken[];
  footer?: HeaderFooterToken[];
  transferInfo: {
    conditions: {
      condition: CriteriaGroup | CriteriaTerminal;
      owner?: string;
      account?: string;
    };
    else: {
      owner?: string;
      account?: string;
    };
  };
}
