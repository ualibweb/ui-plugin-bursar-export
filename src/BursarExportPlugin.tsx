import {
  Button,
  LoadingPane,
  Pane,
  PaneFooter,
} from '@folio/stripes/components';
import React, { useCallback } from 'react';
import ConfigurationForm from './form/ConfigurationForm';
import useFeeFineOwners from './api/useFeeFineOwners';
import useFeeFineTypes from './api/useFeeFineTypes';
import useLocations from './api/useLocations';
import usePatronGroups from './api/usePatronGroups';
import useServicePoints from './api/useServicePoints';

export default function BursarExports() {
  const feeFineOwners = useFeeFineOwners();
  const feeFineTypes = useFeeFineTypes();
  const locations = useLocations();
  const patronGroups = usePatronGroups();
  const servicePoints = useServicePoints();

  const submitCallback = useCallback((v) => console.log(v), []);

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
          renderStart={<Button>Run manually</Button>}
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
