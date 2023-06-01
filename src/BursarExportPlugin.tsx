import {
  Button,
  LoadingPane,
  Pane,
  PaneFooter,
} from '@folio/stripes/components';
import { FormApi } from 'final-form';
import React, { useCallback, useRef } from 'react';
import formValuesToDto from './api/dto/to/formValuesToDto';
import schedulingToDto from './api/dto/to/schedulingToDto';
import useAutomaticSchedulerMutation from './api/mutators/useAutomaticSchedulerMutation';
import useManualSchedulerMutation from './api/mutators/useManualSchedulerMutation';
import ConfigurationForm, { FORM_ID } from './form/ConfigurationForm';
import useInitialValues from './hooks/useInitialValues';
import FormValues from './types/FormValues';

export default function BursarExportPlugin() {
  const manualScheduler = useManualSchedulerMutation();
  const automaticScheduler = useAutomaticSchedulerMutation();

  const formApiRef = useRef<FormApi<FormValues>>(null);

  const submitCallback = useCallback(async (values: FormValues) => {
    if (values.buttonClicked === 'manual') {
      await manualScheduler(formValuesToDto(values));
    } else {
      await automaticScheduler({
        bursar: formValuesToDto(values),
        scheduling: schedulingToDto(values.scheduling),
      });
    }
  }, []);

  const initialValues = useInitialValues();

  if (initialValues === null) {
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
        initialValues={initialValues}
        onSubmit={submitCallback}
        formApiRef={formApiRef}
      />
    </Pane>
  );
}
