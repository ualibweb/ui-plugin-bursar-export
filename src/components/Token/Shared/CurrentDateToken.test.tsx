import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import { HeaderFooterTokenType } from '../../../types/TokenTypes';
import HeaderFooterCardBody from '../HeaderFooter/HeaderFooterCardBody';

describe('Current date token', () => {
  it('displays appropriate form', async () => {
    const submitter = jest.fn();

    render(
      withIntlConfiguration(
        <Form
          mutators={{ ...arrayMutators }}
          onSubmit={(v) => submitter(v)}
          initialValues={{ test: { type: HeaderFooterTokenType.CURRENT_DATE } }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <HeaderFooterCardBody name="test" />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>,
        'en-US',
        'America/Chicago'
      )
    );

    expect(screen.getByRole('combobox', { name: 'Format' })).toHaveDisplayValue(
      'Year (4-digit)'
    );
    expect(screen.getByRole('option', { name: 'Quarter' })).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: 'Timezone' })
    ).toHaveDisplayValue('America/Chicago');
    expect(
      screen.getByRole('option', { name: 'Europe/Lisbon' })
    ).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'UTC' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: {
        type: HeaderFooterTokenType.CURRENT_DATE,
        format: 'YEAR_LONG',
        timezone: 'America/Chicago',
      },
    });
  });
});
