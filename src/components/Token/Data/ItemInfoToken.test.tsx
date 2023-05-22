import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import { DataTokenType } from '../../../types/TokenTypes';
import DataCardBody from './DataTokenCardBody';

describe('Item info type token', () => {
  it('displays appropriate form', async () => {
    const submitter = jest.fn();

    render(
      <Form
        mutators={{ ...arrayMutators }}
        onSubmit={(v) => submitter(v)}
        initialValues={{ test: { type: DataTokenType.FEE_FINE_TYPE } }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <DataCardBody name="test" />
            <button type="submit">Submit</button>
          </form>
        )}
      </Form>
    );

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: {
        type: DataTokenType.FEE_FINE_TYPE,
        attribute: 'FEE_FINE_TYPE_NAME',
      },
    });

    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Attribute' }),
      'Type ID'
    );

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: {
        type: DataTokenType.FEE_FINE_TYPE,
        attribute: 'FEE_FINE_TYPE_ID',
      },
    });
  });
});
