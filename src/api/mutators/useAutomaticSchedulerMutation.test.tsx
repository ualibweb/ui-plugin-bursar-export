import { CalloutContext } from '@folio/stripes/core';
import { waitFor } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import useAutomaticSchedulerMutation from './useAutomaticSchedulerMutation';

const kyMock = jest.fn();

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => ({
    post: kyMock,
  }),
}));

describe('Automatic scheduling mutation', () => {
  const original = console.error;

  beforeAll(() => {
    console.error = jest.fn(); // hush when we do Promise.reject
  });

  afterAll(() => {
    console.error = original;
  });

  const contextMock = jest.fn();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={new QueryClient()}>
      <CalloutContext.Provider value={{ sendCallout: contextMock }}>
        {children}
      </CalloutContext.Provider>
    </QueryClientProvider>
  );

  it('handles successful responses', async () => {
    const { result: mutator } = renderHook(
      () => useAutomaticSchedulerMutation(),
      { wrapper }
    );

    kyMock.mockReturnValueOnce(Promise.resolve({}));

    act(() => {
      mutator.current({
        bursar: 'bursar data',
        scheduling: { schedulingData: 'is here!' },
      } as any);
    });

    waitFor(() =>
      expect(kyMock).toHaveBeenLastCalledWith('data-export-spring/configs', {
        type: 'BURSAR_FEES_FINES',
        exportTypeSpecificParameters: { bursarFeeFines: 'bursar data' },
        schedulingData: 'is here!',
      })
    );

    waitFor(() =>
      expect(contextMock).toHaveBeenLastCalledWith({
        type: 'success',
        message: 'Configuration saved',
      })
    );
  });

  it('handles error responses', async () => {
    const { result: mutator } = renderHook(
      () => useAutomaticSchedulerMutation(),
      { wrapper }
    );

    kyMock.mockReturnValueOnce(Promise.reject({}));

    act(() => {
      mutator.current({
        bursar: 'bursar data that fails',
        scheduling: { schedulingData: 'is here!' },
      } as any);
    });

    waitFor(() =>
      expect(kyMock).toHaveBeenLastCalledWith('data-export-spring/configs', {
        type: 'BURSAR_FEES_FINES',
        exportTypeSpecificParameters: {
          bursarFeeFines: 'bursar data that fails',
        },
        schedulingData: 'is here!',
      })
    );

    waitFor(() =>
      expect(contextMock).toHaveBeenLastCalledWith({
        type: 'error',
        message: 'Failed to save job',
      })
    );
  });
});
