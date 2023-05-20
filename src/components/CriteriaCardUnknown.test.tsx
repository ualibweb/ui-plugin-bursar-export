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

it('Criteria card with unknown type should display loading', async () => {
  const { container } = render(
    withIntlConfiguration(
      <Form
        mutators={{ ...arrayMutators }}
        onSubmit={noop}
        initialValues={{ criteria: { type: 'foobar' } }}
      >
        {() => <CriteriaCard name="criteria" root alone />}
      </Form>
    )
  );

  screen.debug();

  expect(
    container.querySelector('[data-test-card-body] .spinner')
  ).toBeInTheDocument();
});
