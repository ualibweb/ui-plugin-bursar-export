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
import useFeeFineOwners, { FeeFineOwnerDTO } from '../api/useFeeFineOwners';
import useFeeFineTypes, { FeeFineTypeDTO } from '../api/useFeeFineTypes';
import useLocations, { LocationDTO } from '../api/useLocations';
import usePatronGroups, { PatronGroupDTO } from '../api/usePatronGroups';
import useServicePoints, { ServicePointDTO } from '../api/useServicePoints';
import useTransferAccounts from '../api/useTransferAccounts';
import CriteriaMenu from './sections/CriteriaMenu';
import SchedulingMenu from './sections/SchedulingMenu';
import { FormValues } from './types';

export const FORM_ID = 'ui-plugin-bursar-export-form';

interface ConfigurationFormProps {
  feeFineOwners: FeeFineOwnerDTO[];
  feeFineTypes: FeeFineTypeDTO[];
  locations: LocationDTO[];
  patronGroups: PatronGroupDTO[];
  servicePoints: ServicePointDTO[];
}

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
        <Accordion label="Criteria">
          <CriteriaMenu />
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
        <Accordion label="Debug (useFeeFineTypes)" closedByDefault>
          <pre>{JSON.stringify(useFeeFineTypes().data, undefined, 2)}</pre>
        </Accordion>
        <Accordion label="Debug (useTransferAccounts)" closedByDefault>
          <pre>{JSON.stringify(useTransferAccounts().data, undefined, 2)}</pre>
        </Accordion>
      </AccordionSet>
    </form>
  );
}

export default stripesFinalForm<ConfigurationFormProps, FormValues>({
  validateOnBlur: true,
  // TODO: add validate,
})(ConfigurationForm);
