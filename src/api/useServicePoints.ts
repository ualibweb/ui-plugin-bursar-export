import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import { MAX_LIMIT, ServicePointDTO, ServicePointResponse } from './types';

export default function useServicePoints() {
  const ky = useOkapiKy();

  return useQuery<ServicePointDTO[]>(
    ['ui-plugin-bursar-export', 'service-points'],
    async () =>
      (
        await ky
          .get(`service-points?cql.allRecords=1&limit=${MAX_LIMIT}`)
          .json<ServicePointResponse>()
      ).servicepoints
  );
}
