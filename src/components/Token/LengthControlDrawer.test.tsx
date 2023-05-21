import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../test/util/withIntlConfiguration';
import FormValues from '../../types/FormValues';
import LengthControlDrawer from './LengthControlDrawer';

describe('Length control drawer', () => {
  const submitter = jest.fn();

  beforeEach(async () => {
    render(
      withIntlConfiguration(
        <Form<FormValues>
          mutators={{ ...arrayMutators }}
          onSubmit={(v) => submitter(v)}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <LengthControlDrawer prefix="test." />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );
  });

  it('displays all fields', async () => {
    expect(await screen.findByLabelText('Desired length')).toBeVisible();
    expect(await screen.findByLabelText('Fill extra space with')).toBeVisible();
    expect(await screen.findByLabelText('Add characters to')).toBeVisible();
    expect(await screen.findByLabelText('Truncate if too long')).toBeVisible();
  });

  it('gives correct result if truncate/direction not touched', async () => {
    await userEvent.type(await screen.findByLabelText('Desired length'), '8');
    // should be truncated
    await userEvent.type(
      await screen.findByLabelText('Fill extra space with'),
      'abc'
    );

    await userEvent.click(
      await screen.findByRole('button', { name: 'Submit' })
    );

    expect(submitter).toHaveBeenCalledWith({
      test: {
        length: '8',
        character: 'a',
        direction: 'FRONT',
        truncate: false,
      },
    });
  });

  it('gives correct result if truncate and direction changed from default', async () => {
    await userEvent.type(await screen.findByLabelText('Desired length'), '12');
    await userEvent.type(
      await screen.findByLabelText('Fill extra space with'),
      ' '
    );
    await userEvent.selectOptions(
      await screen.findByLabelText('Add characters to'),
      'BACK'
    );
    await userEvent.click(await screen.findByLabelText('Truncate if too long'));

    await userEvent.click(
      await screen.findByRole('button', { name: 'Submit' })
    );

    expect(submitter).toHaveBeenCalledWith({
      test: {
        length: '12',
        character: ' ',
        direction: 'BACK',
        truncate: true,
      },
    });
  });

  it('updates front/back label appropriately', async () => {
    expect(await screen.findByLabelText('Add characters to')).toBeVisible();
    await userEvent.click(await screen.findByLabelText('Truncate if too long'));
    expect(
      await screen.findByLabelText('Add/remove characters to/from')
    ).toBeVisible();
    await userEvent.click(await screen.findByLabelText('Truncate if too long'));
    expect(await screen.findByLabelText('Add characters to')).toBeVisible();
  });
});
