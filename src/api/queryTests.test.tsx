import { renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import usePatronGroups from './usePatronGroups';
import { MAX_LIMIT } from './types';

const kyMock = jest.fn();

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => ({
    get: kyMock,
  }),
}));

describe('API Query Tests', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('Patron groups query works as expected', async () => {
    kyMock.mockReturnValue({
      json: () =>
        Promise.resolve({
          usergroups: [
            { id: '1', group: 'staff' },
            { id: '2', group: 'undergraduate' },
          ],
        }),
    });

    const { result, waitFor } = renderHook(() => usePatronGroups(), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(kyMock).toHaveBeenCalledWith('groups?limit=2147483647');
    expect(result.current.data).toStrictEqual([
      { id: '1', group: 'staff' },
      { id: '2', group: 'undergraduate' },
    ]);
  });
});
