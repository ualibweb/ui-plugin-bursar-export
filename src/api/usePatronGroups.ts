import { useOkapiKy } from '@folio/stripes/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { PatronGroupDTO, PatronGroupResponse } from './types';

export const MAX_LIMIT = 2147483647;

export default function usePatronGroups() {
  const ky = useOkapiKy();

  return useQuery<PatronGroupDTO[]>(
    ['ui-plugin-bursar-export', 'patron-groups'],
    async () =>
      (await ky.get(`groups?limit=${MAX_LIMIT}`).json<PatronGroupResponse>())
        .usergrops
  ).data;
}
