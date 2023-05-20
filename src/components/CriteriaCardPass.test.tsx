import { render, screen } from '@testing-library/react';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import {
  CriteriaCardGroupType,
  CriteriaCardTerminalType,
  FormValues,
} from '../form/types';
import withIntlConfiguration from '../test/util/withIntlConfiguration';
import CriteriaCardToolbox from './CriteriaCardToolbox';
import CriteriaCard from './CriteriaCard';

const noop = () => ({});

it('Criteria card with "no criteria" should be empty', () => {
  const { container } = render(
    withIntlConfiguration(
      <Form<FormValues> mutators={{ ...arrayMutators }} onSubmit={noop}>
        {() => <CriteriaCard name="criteria" root alone />}
      </Form>
    )
  );

  expect(container.querySelector('[data-test-card-body]')).toHaveTextContent(
    ''
  );
});
