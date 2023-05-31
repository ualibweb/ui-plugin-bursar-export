import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import { SchedulingDTO } from '../dto/types';

export interface CurrentConfigResponse {
  totalRecords: number;
  configs?: Required<SchedulingDTO>[];
}

export default function useCurrentConfig() {
  const ky = useOkapiKy();

  return useQuery<Required<SchedulingDTO> | null>(
    ['ui-plugin-bursar-export', 'institutions'],
    async () =>
      (
        await ky
          .get(`data-export-spring/configs`, {
            searchParams: { limit: 1, query: 'type==BURSAR_FEES_FINES' },
          })
          .json<CurrentConfigResponse>()
      ).configs?.[0] ?? null
  );
}
