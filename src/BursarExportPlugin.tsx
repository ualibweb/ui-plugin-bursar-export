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
import useFeeFineOwners from './api/queries/useFeeFineOwners';
import useFeeFineTypes from './api/queries/useFeeFineTypes';
import useLocations from './api/queries/useLocations';
import usePatronGroups from './api/queries/usePatronGroups';
import useServicePoints from './api/queries/useServicePoints';
import ConfigurationForm, { FORM_ID } from './form/ConfigurationForm';
import FormValues from './types/FormValues';
import useCurrentConfig from './api/queries/useCurrentConfig';
import dtoToFormValues from './api/dto/from/dtoToFormValues';
import { useIntl } from 'react-intl';
import { useLocaleWeekdays } from './utils/WeekdayUtils';

export default function BursarExportPlugin() {
  const feeFineOwners = useFeeFineOwners();
  const feeFineTypes = useFeeFineTypes();
  const locations = useLocations();
  const patronGroups = usePatronGroups();
  const servicePoints = useServicePoints();

  const currentConfig = useCurrentConfig();

  const manualScheduler = useManualSchedulerMutation();
  const automaticScheduler = useAutomaticSchedulerMutation();

  const localeWeekdays = useLocaleWeekdays(useIntl());

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

  // if any are not successful, show loading pane
  if (
    !currentConfig.isSuccess ||
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
        initialValues={dtoToFormValues(currentConfig.data, localeWeekdays)}
        onSubmit={submitCallback}
        formApiRef={formApiRef}
      />
    </Pane>
  );
}
