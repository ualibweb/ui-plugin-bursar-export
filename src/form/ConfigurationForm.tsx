import {
  Accordion,
  AccordionSet,
  Col,
  ExpandAllButton,
  Row,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import React, { FormEvent, useCallback } from 'react';
import { FormRenderProps, FormSpy } from 'react-final-form';
import SchedulingMenu from './sections/SchedulingMenu';
import { FormValues } from './types';
import usePatronGroups from '../api/usePatronGroups';
import useServicePoints from '../api/useServicePoints';
import useLocations from '../api/useLocations';
import useFeeFineOwners from '../api/useFeeFineOwners';

export const FORM_ID = 'ui-plugin-bursar-export-form';

interface ConfigurationFormProps {}

function ConfigurationForm({
  handleSubmit,
}: FormRenderProps<FormValues> & ConfigurationFormProps) {
  const submitter = useCallback(
    (e: FormEvent) => {
      handleSubmit(e)?.catch(() => {
        throw new Error();
      });
    },
    [handleSubmit]
  );

  return (
    <form id={FORM_ID} onSubmit={submitter}>
      <AccordionSet>
        <Row end="xs">
          <Col xs>
            <ExpandAllButton />
          </Col>
        </Row>
        <Accordion label="Scheduling">
          <SchedulingMenu />
        </Accordion>
        <Accordion label="Second section">
          <p>Fields should go here...</p>
        </Accordion>
        <Accordion label="Debug (form state)">
          <FormSpy subscription={{ values: true }}>
            {({ values }) => <pre>{JSON.stringify(values, undefined, 2)}</pre>}
          </FormSpy>
        </Accordion>
        <Accordion label="Debug (usePatronGroups)" closedByDefault>
          <pre>{JSON.stringify(usePatronGroups().data, undefined, 2)}</pre>
        </Accordion>
        <Accordion label="Debug (useServicePoints)" closedByDefault>
          <pre>{JSON.stringify(useServicePoints().data, undefined, 2)}</pre>
        </Accordion>
        <Accordion label="Debug (useLocations)" closedByDefault>
          <pre>{JSON.stringify(useLocations().data, undefined, 2)}</pre>
        </Accordion>
        <Accordion label="Debug (useFeeFineOwners)" closedByDefault>
          <pre>{JSON.stringify(useFeeFineOwners().data, undefined, 2)}</pre>
        </Accordion>
      </AccordionSet>
    </form>
  );
}

export default stripesFinalForm<ConfigurationFormProps, FormValues>({
  validateOnBlur: true,
  // TODO: add validate,
})(ConfigurationForm);
