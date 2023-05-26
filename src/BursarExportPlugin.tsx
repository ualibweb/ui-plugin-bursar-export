import {
  Button,
  LoadingPane,
  Pane,
  PaneFooter,
} from '@folio/stripes/components';
import React, { useCallback } from 'react';
import ConfigurationForm, { FORM_ID } from './form/ConfigurationForm';
import useFeeFineOwners from './api/useFeeFineOwners';
import useFeeFineTypes from './api/useFeeFineTypes';
import useLocations from './api/useLocations';
import usePatronGroups from './api/usePatronGroups';
import useServicePoints from './api/useServicePoints';
import FormValues from './types/FormValues';
import useManualSchedulerMutation from './api/mutators/useManualSchedulerMutation';
import formValuesToDto from './api/dto/formValuesToDto';

export default function BursarExports() {
  const feeFineOwners = useFeeFineOwners();
  const feeFineTypes = useFeeFineTypes();
  const locations = useLocations();
  const patronGroups = usePatronGroups();
  const servicePoints = useServicePoints();

  const manualScheduler = useManualSchedulerMutation();

  const submitCallback = useCallback(
    (values: FormValues) => manualScheduler(formValuesToDto(values)),
    []
  );

  if (
    !feeFineOwners.isSuccess ||
    !feeFineTypes.isSuccess ||
    !locations.isSuccess ||
    !patronGroups.isSuccess ||
    !servicePoints.isSuccess
  ) {
    return (
      <LoadingPane
        paneTitle="Transfer configuration"
        defaultWidth="fill"
        footer={
          <PaneFooter
            renderStart={<Button disabled>Run manually</Button>}
            renderEnd={
              <Button disabled buttonStyle="primary">
                Save
              </Button>
            }
          />
        }
      />
    );
  }

  return (
    <Pane
      defaultWidth="fill"
      footer={
        <PaneFooter
          renderStart={
            <Button type="submit" form={FORM_ID}>
              Run manually
            </Button>
          }
          renderEnd={<Button buttonStyle="primary">Save</Button>}
        />
      }
      id="pane-batch-group-configuration"
      paneTitle="Transfer configuration"
    >
      <ConfigurationForm
        initialValues={{}}
        onSubmit={submitCallback}
        feeFineOwners={feeFineOwners.data}
        feeFineTypes={feeFineTypes.data}
        locations={locations.data}
        patronGroups={patronGroups.data}
        servicePoints={servicePoints.data}
      />
    </Pane>
  );
}
