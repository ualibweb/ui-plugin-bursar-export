import {
  Accordion,
  AccordionSet,
  Col,
  ExpandAllButton,
  Row,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import React, { FormEvent, useCallback } from 'react';
import { FormRenderProps, FormSpy, useField } from 'react-final-form';
import formValuesToDto from '../api/dto/formValuesToDto';
import useCampuses from '../api/useCampuses';
import useFeeFineOwners, { FeeFineOwnerDTO } from '../api/useFeeFineOwners';
import useFeeFineTypes, { FeeFineTypeDTO } from '../api/useFeeFineTypes';
import useInstitutions from '../api/useInstitutions';
import useLibraries from '../api/useLibraries';
import useLocations, { LocationDTO } from '../api/useLocations';
import usePatronGroups, { PatronGroupDTO } from '../api/usePatronGroups';
import useServicePoints, { ServicePointDTO } from '../api/useServicePoints';
import useTransferAccounts from '../api/useTransferAccounts';
import FormValues from '../types/FormValues';
import AggregateMenu from './sections/AggregateMenu';
import CriteriaMenu from './sections/CriteriaMenu';
import DataTokenMenu from './sections/DataTokenMenu';
import ExportPreview from './sections/ExportPreview';
import HeaderFooterMenu from './sections/HeaderFooterMenu';
import SchedulingMenu from './sections/SchedulingMenu';
import TransferInfoMenu from './sections/TransferInfoMenu';

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

  const aggregateEnabled = useField<boolean>('aggregate', {
    subscription: { value: true },
    format: (value) => value ?? false,
  }).input.value;

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
        <Accordion label="Aggregate by patron">
          <AggregateMenu />
        </Accordion>
        <Accordion label="Header format">
          <HeaderFooterMenu name="header" />
        </Accordion>
        <Accordion
          label={
            aggregateEnabled ? 'Patron data format' : 'Account data format'
          }
        >
          <DataTokenMenu />
        </Accordion>
        <Accordion label="Footer format">
          <HeaderFooterMenu name="footer" />
        </Accordion>

        <Accordion label="Preview">
          <ExportPreview />
        </Accordion>

        <Accordion label="Transfer accounts to">
          <TransferInfoMenu />
        </Accordion>

        <Accordion label="Debug (form state)">
          <FormSpy subscription={{ values: true }}>
            {({ values }) => <pre>{JSON.stringify(values, undefined, 2)}</pre>}
          </FormSpy>
        </Accordion>
        <Accordion label="Debug (formValuesToDto)">
          <FormSpy<FormValues> subscription={{ values: true }}>
            {({ values }) => (
              <pre>{JSON.stringify(formValuesToDto(values), undefined, 2)}</pre>
            )}
          </FormSpy>
        </Accordion>
        <Accordion label="Debug (usePatronGroups)" closedByDefault>
          <pre>{JSON.stringify(usePatronGroups().data, undefined, 2)}</pre>
        </Accordion>
        <Accordion label="Debug (useServicePoints)" closedByDefault>
          <pre>{JSON.stringify(useServicePoints().data, undefined, 2)}</pre>
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
        <Accordion label="Debug (useInstitutions)" closedByDefault>
          <pre>{JSON.stringify(useInstitutions().data, undefined, 2)}</pre>
        </Accordion>
        <Accordion label="Debug (useCampuses)" closedByDefault>
          <pre>{JSON.stringify(useCampuses().data, undefined, 2)}</pre>
        </Accordion>
        <Accordion label="Debug (useLibraries)" closedByDefault>
          <pre>{JSON.stringify(useLibraries().data, undefined, 2)}</pre>
        </Accordion>
        <Accordion label="Debug (useLocations)" closedByDefault>
          <pre>{JSON.stringify(useLocations().data, undefined, 2)}</pre>
        </Accordion>
      </AccordionSet>
    </form>
  );
}

export default stripesFinalForm<ConfigurationFormProps, FormValues>({
  validateOnBlur: true,
  // TODO: add validate,
})(ConfigurationForm);
