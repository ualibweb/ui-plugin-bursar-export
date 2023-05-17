import {
  Accordion,
  AccordionSet,
  Col,
  ExpandAllButton,
  Row,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import React, { FormEvent, useCallback } from 'react';
import { FormRenderProps } from 'react-final-form';
import { FormValues } from './types';

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
        <Accordion label="First section">
          <p>Fields should go here...</p>
        </Accordion>
        <Accordion label="Second section">
          <p>Fields should go here...</p>
        </Accordion>
      </AccordionSet>
    </form>
  );
}

export default stripesFinalForm<ConfigurationFormProps, FormValues>({
  validateOnBlur: true,
  // TODO: add validate,
})(ConfigurationForm);
