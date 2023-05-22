import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import { HeaderFooterTokenType } from '../../../types/TokenTypes';
import HeaderFooterCardBody from '../HeaderFooter/HeaderFooterCardBody';

describe('Arbitrary text token', () => {
  it('displays appropriate form', async () => {
    const submitter = jest.fn();

    render(
      withIntlConfiguration(
        <Form
          onSubmit={(v) => submitter(v)}
          initialValues={{
            test: { type: HeaderFooterTokenType.ARBITRARY_TEXT },
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <HeaderFooterCardBody name="test" />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );

    expect(screen.getByRole('textbox')).toBeVisible();

    await userEvent.type(screen.getByRole('textbox'), 'Sample constant!');
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: {
        type: HeaderFooterTokenType.ARBITRARY_TEXT,
        text: 'Sample constant!',
      },
    });
  });
});
