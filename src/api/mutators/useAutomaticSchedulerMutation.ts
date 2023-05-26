import { CalloutContext, useOkapiKy } from '@folio/stripes/core';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { BursarExportJobDTO, SchedulingDTO } from '../dto/types';

export default function useAutomaticSchedulerMutation() {
  const ky = useOkapiKy();
  const context = useContext(CalloutContext);

  const mutation = useMutation(
    // TODO: handle updating an existing job
    async (parameters: {
      bursar: BursarExportJobDTO;
      scheduling: SchedulingDTO;
    }) =>
      ky.post('data-export-spring/configs', {
        json: {
          type: 'BURSAR_FEES_FINES',
          exportTypeSpecificParameters: { bursarFeeFines: parameters.bursar },
          ...parameters.scheduling,
        },
      }),
    {
      onError: () =>
        context.sendCallout({ type: 'error', message: 'Failed to save job' }),
      onSuccess: () =>
        context.sendCallout({
          type: 'success',
          message: 'Configuration saved',
        }),
    }
  );

  return async (parameters: {
    bursar: BursarExportJobDTO;
    scheduling: SchedulingDTO;
  }) => {
    try {
      await mutation.mutateAsync(parameters);
    } catch (e) {}
    return {};
  };
}
