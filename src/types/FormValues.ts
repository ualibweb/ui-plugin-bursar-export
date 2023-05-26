import {
  CriteriaAggregate,
  CriteriaGroup,
  CriteriaTerminal,
} from './CriteriaTypes';
import SchedulingFrequency from './SchedulingFrequency';
import { DataToken, HeaderFooterToken } from './TokenTypes';

// for coverage
export const TYPE_ONLY = true;

export default interface FormValues {
  scheduling: {
    frequency: SchedulingFrequency;
    interval?: number;
  };

  criteria: CriteriaGroup | CriteriaTerminal;

  aggregate: boolean;
  aggregateFilter?: CriteriaAggregate;

  header?: HeaderFooterToken[];
  data?: DataToken[];
  dataAggregate?: DataToken[];
  footer?: HeaderFooterToken[];

  transferInfo?: {
    conditions?: {
      condition: CriteriaGroup | CriteriaTerminal;
      owner?: string;
      account?: string;
    }[];
    else?: {
      owner?: string;
      account?: string;
    };
  };
}
