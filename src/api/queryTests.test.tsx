import { renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import useLocations from './useLocations';
import usePatronGroups from './usePatronGroups';
import useServicePoints from './useServicePoints';
import useFeeFineTypes from './useFeeFineTypes';
import useFeeFineOwners from './useFeeFineOwners';

const responseMock = jest.fn();
const kyMock = jest.fn(() => ({
  json: () => {
    return Promise.resolve(responseMock());
  },
}));

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
    responseMock.mockResolvedValue({
      usergroups: [
        { id: '1', group: 'staff' },
        { id: '2', group: 'undergraduate' },
      ],
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

  it('Service points query works as expected', async () => {
    responseMock.mockResolvedValue({
      servicepoints: [
        { id: '1', name: 'Circ desk 1' },
        { id: '2', name: 'Online' },
      ],
    });

    const { result, waitFor } = renderHook(() => useServicePoints(), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(kyMock).toHaveBeenCalledWith(
      'service-points?cql.allRecords=1&limit=2147483647'
    );
    expect(result.current.data).toStrictEqual([
      { id: '1', name: 'Circ desk 1' },
      { id: '2', name: 'Online' },
    ]);
  });

  it('Locations query works as expected', async () => {
    responseMock.mockResolvedValue({
      locations: [
        {
          id: '1',
          name: 'Popular Reading Collection',
          code: 'KU/CC/DI/P',
        },
        {
          id: '2',
          name: 'Online',
          code: 'E',
        },
        {
          id: '3',
          name: 'SECOND FLOOR',
          code: 'KU/CC/DI/2',
        },
        {
          id: '4',
          name: 'Annex',
          code: 'KU/CC/DI/A',
        },
      ],
    });

    const { result, waitFor } = renderHook(() => useLocations(), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(kyMock).toHaveBeenCalledWith(
      'locations?cql.allRecords=1&limit=2147483647'
    );
    expect(result.current.data).toStrictEqual([
      {
        id: '1',
        name: 'Popular Reading Collection',
        code: 'KU/CC/DI/P',
      },
      {
        id: '2',
        name: 'Online',
        code: 'E',
      },
      {
        id: '3',
        name: 'SECOND FLOOR',
        code: 'KU/CC/DI/2',
      },
      {
        id: '4',
        name: 'Annex',
        code: 'KU/CC/DI/A',
      },
    ]);
  });

  it('Fee fine owners query works as expected', async () => {
    responseMock.mockResolvedValue({
      owners: [
        {
          id: '9cb8f9fd-4386-45d0-bb6e-aa8b33e577b0',
          owner: 'Owner 1',
        },
        {
          id: '3da4b49d-ee7a-41fc-bf53-10f626180f7f',
          owner: 'Owner 2',
        },
        {
          id: '4ae65faa-8df7-4fbc-a4db-ccdcc1479b10',
          owner: 'Shared',
          servicePointOwner: [],
        },
      ],
    });

    const { result, waitFor } = renderHook(() => useFeeFineOwners(), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(kyMock).toHaveBeenCalledWith(
      'owners?cql.allRecords=1&limit=2147483647'
    );
    expect(result.current.data).toStrictEqual([
      {
        id: '9cb8f9fd-4386-45d0-bb6e-aa8b33e577b0',
        owner: 'Owner 1',
      },
      {
        id: '3da4b49d-ee7a-41fc-bf53-10f626180f7f',
        owner: 'Owner 2',
      },
      {
        id: '4ae65faa-8df7-4fbc-a4db-ccdcc1479b10',
        owner: 'Shared',
        servicePointOwner: [],
      },
    ]);
  });

  it('Fee fine types query works as expected', async () => {
    responseMock.mockResolvedValue({
      feefines: [
        {
          id: '9523cb96-e752-40c2-89da-60f3961a488d',
          feeFineType: 'Overdue fine',
          automatic: true,
        },
        {
          id: 'cf238f9f-7018-47b7-b815-bb2db798e19f',
          feeFineType: 'Lost item fee',
          automatic: true,
        },
        {
          id: '49223209-4d06-4bb5-8b7e-d0b7e5b8fb10',
          ownerId: '9cb8f9fd-4386-45d0-bb6e-aa8b33e577b0',
          feeFineType: 'Type 1',
          automatic: false,
        },
      ],
    });

    const { result, waitFor } = renderHook(() => useFeeFineTypes(), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(kyMock).toHaveBeenCalledWith(
      'feefines?cql.allRecords=1&limit=2147483647'
    );
    expect(result.current.data).toStrictEqual([
      {
        id: '9523cb96-e752-40c2-89da-60f3961a488d',
        feeFineType: 'Overdue fine',
        automatic: true,
      },
      {
        id: 'cf238f9f-7018-47b7-b815-bb2db798e19f',
        feeFineType: 'Lost item fee',
        automatic: true,
      },
      {
        id: '49223209-4d06-4bb5-8b7e-d0b7e5b8fb10',
        ownerId: '9cb8f9fd-4386-45d0-bb6e-aa8b33e577b0',
        feeFineType: 'Type 1',
        automatic: false,
      },
    ]);
  });
});
