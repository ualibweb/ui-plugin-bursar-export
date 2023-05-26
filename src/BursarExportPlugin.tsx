import {
  Button,
  LoadingPane,
  Pane,
  PaneFooter,
} from '@folio/stripes/components';
import React, { useCallback, useRef } from 'react';
import ConfigurationForm, { FORM_ID } from './form/ConfigurationForm';
import useFeeFineOwners from './api/useFeeFineOwners';
import useFeeFineTypes from './api/useFeeFineTypes';
import useLocations from './api/useLocations';
import usePatronGroups from './api/usePatronGroups';
import useServicePoints from './api/useServicePoints';
import FormValues from './types/FormValues';
import useManualSchedulerMutation from './api/mutators/useManualSchedulerMutation';
import formValuesToDto from './api/dto/formValuesToDto';
import { FormApi } from 'final-form';
import useAutomaticSchedulerMutation from './api/mutators/useAutomaticSchedulerMutation';
import schedulingToDto from './api/dto/schedulingToDto';

export default function BursarExports() {
  const feeFineOwners = useFeeFineOwners();
  const feeFineTypes = useFeeFineTypes();
  const locations = useLocations();
  const patronGroups = usePatronGroups();
  const servicePoints = useServicePoints();

  const manualScheduler = useManualSchedulerMutation();
  const automaticScheduler = useAutomaticSchedulerMutation();

  const formApiRef = useRef<FormApi<FormValues>>(null);

  const submitCallback = useCallback((values: FormValues) => {
    if (values.buttonClicked === 'manual') {
      manualScheduler(formValuesToDto(values));
    } else {
      automaticScheduler({
        bursar: formValuesToDto(values),
        scheduling: schedulingToDto(values.scheduling),
      });
    }
  }, []);

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
            <Button
              type="submit"
              form={FORM_ID}
              onClick={() =>
                formApiRef.current?.change('buttonClicked', 'manual')
              }
            >
              Run manually
            </Button>
          }
          renderEnd={
            <Button
              buttonStyle="primary"
              type="submit"
              form={FORM_ID}
              onClick={() =>
                formApiRef.current?.change('buttonClicked', 'save')
              }
            >
              Save
            </Button>
          }
        />
      }
      id="pane-batch-group-configuration"
      paneTitle="Transfer configuration"
    >
      <ConfigurationForm
        initialValues={{}}
        onSubmit={submitCallback}
        formApiRef={formApiRef}
      />
    </Pane>
  );
}
