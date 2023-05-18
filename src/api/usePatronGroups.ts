import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import { MAX_LIMIT, PatronGroupDTO, PatronGroupResponse } from './types';

export default function usePatronGroups() {
  const ky = useOkapiKy();

  return useQuery<PatronGroupDTO[]>(
    ['ui-plugin-bursar-export', 'patron-groups'],
    async () =>
      (await ky.get(`groups?limit=${MAX_LIMIT}`).json<PatronGroupResponse>())
        .usergrops
  ).data;
}
