import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import { HeaderFooterTokenType } from '../../../types/TokenTypes';
import HeaderFooterCardBody from '../HeaderFooter/HeaderFooterCardBody';

describe('Aggregate total token', () => {
  it('displays appropriate form', async () => {
    const submitter = jest.fn();

    render(
      withIntlConfiguration(
        <Form
          mutators={{ ...arrayMutators }}
          onSubmit={(v) => submitter(v)}
          initialValues={{
            test: { type: HeaderFooterTokenType.AGGREGATE_TOTAL },
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

    expect(screen.getByRole('checkbox')).toBeVisible();

    // check default
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: {
        type: HeaderFooterTokenType.AGGREGATE_TOTAL,
        decimal: true,
      },
    });

    await userEvent.click(screen.getByRole('checkbox'));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: {
        type: HeaderFooterTokenType.AGGREGATE_TOTAL,
        decimal: false,
      },
    });

    await userEvent.click(screen.getByRole('checkbox'));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: {
        type: HeaderFooterTokenType.AGGREGATE_TOTAL,
        decimal: true,
      },
    });
  });
});
