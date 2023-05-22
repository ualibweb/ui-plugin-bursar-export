import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration, {
  withIntlConfigurationAnyTimezone,
} from '../../../test/util/withIntlConfiguration';
import TimezonePicker from './TimezonePicker';

describe('Timezone picker', () => {
  it('displays appropriate form', async () => {
    const submitter = jest.fn();

    render(
      withIntlConfiguration(
        <Form mutators={{ ...arrayMutators }} onSubmit={(v) => submitter(v)}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TimezonePicker prefix="" />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>,
        'en-US',
        'America/Chicago'
      )
    );

    expect(
      screen.getByRole('combobox', { name: 'Timezone' })
    ).toHaveDisplayValue('America/Chicago');
    expect(
      screen.getByRole('option', { name: 'Europe/Lisbon' })
    ).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'UTC' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      timezone: 'America/Chicago',
    });
  });

  it('Assumes UTC when no known TZ', async () => {
    const submitter = jest.fn();

    render(
      withIntlConfigurationAnyTimezone(
        <Form mutators={{ ...arrayMutators }} onSubmit={(v) => submitter(v)}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TimezonePicker prefix="" />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>,
        'en-US'
      )
    );

    expect(
      screen.getByRole('combobox', { name: 'Timezone' })
    ).toHaveDisplayValue('UTC');

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      timezone: 'UTC',
    });
  });
});
