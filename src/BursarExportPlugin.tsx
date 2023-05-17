import { Button, Pane, PaneFooter } from '@folio/stripes/components';
import React from 'react';
import ConfigurationForm from './form/ConfigurationForm';

export default function BursarExports() {
  const paneFooter = (
    <PaneFooter
      renderStart={<Button>Run manually</Button>}
      renderEnd={<Button buttonStyle="primary">Save</Button>}
    />
  );

  // if (isLoading) {
  //   return (
  //     <LoadingPane
  //       paneTitle={formatMessage({ id: 'ui-plugin-bursar-export.meta.title' })}
  //       defaultWidth="fill"
  //       footer={paneFooter}
  //     />
  //   );
  // }

  return (
    <Pane
      defaultWidth="fill"
      footer={paneFooter}
      id="pane-batch-group-configuration"
      paneTitle={'Transfer configuration'}
    >
      <ConfigurationForm initialValues={{}} onSubmit={(v) => console.log(v)} />
    </Pane>
  );
}
