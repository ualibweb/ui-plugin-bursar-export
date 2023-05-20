import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import { FormValues } from '../form/types';
import withIntlConfiguration from '../test/util/withIntlConfiguration';
import CriteriaCard from './CriteriaCard';

const noop = () => ({});

it('Criteria card with "no criteria" should be empty', async () => {
  const { container } = render(
    withIntlConfiguration(
      <Form<FormValues> mutators={{ ...arrayMutators }} onSubmit={noop}>
        {() => <CriteriaCard name="criteria" root alone />}
      </Form>
    )
  );

  await userEvent.selectOptions(await screen.findByRole('combobox'), 'All of:');
  await userEvent.selectOptions(
    await screen.findByRole('combobox'),
    'No criteria (always run)'
  );

  expect(container.querySelector('[data-test-card-body]')).toHaveTextContent(
    ''
  );
  expect(container.querySelector('[data-test-card-body]')).toHaveClass(
    'emptyBody'
  );
});
