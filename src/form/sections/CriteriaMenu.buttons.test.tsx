import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import { CriteriaCardGroupType, FormValues } from '../types';
import withIntlConfiguration from '../../test/util/withIntlConfiguration';
import CriteriaCardToolbox from '../../components/CriteriaCardToolbox';
import CriteriaCard from '../../components/CriteriaCard';
import CriteriaMenu from './CriteriaMenu';

describe('Buttons work as expected', () => {
  const submitter = jest.fn();

  function renderWithValue(value: FormValues['criteria']) {
    render(
      withIntlConfiguration(
        <Form<FormValues>
          mutators={{ ...arrayMutators }}
          onSubmit={(v) => submitter(v)}
          initialValues={{ criteria: value }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <CriteriaMenu />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );
  }

  it('Outer add button works as expected', async () => {
    renderWithValue({ type: CriteriaCardGroupType.ALL_OF });

    await userEvent.click(
      await screen.findByRole('button', { name: 'plus-sign' })
    );
    await userEvent.click(
      await screen.findByRole('button', { name: 'Submit' })
    );

    expect(submitter).toHaveBeenLastCalledWith({
      criteria: {
        type: CriteriaCardGroupType.ALL_OF,
        criteria: [
          {
            type: CriteriaCardGroupType.ALL_OF,
            criteria: [],
          },
        ],
      },
    });
  });

  it('Inner add button works as expected', async () => {
    renderWithValue({
      type: CriteriaCardGroupType.ALL_OF,
      criteria: [{ type: CriteriaCardGroupType.ANY_OF, criteria: [] }],
    });

    await userEvent.click(
      (
        await screen.findAllByRole('button', { name: 'plus-sign' })
      )[1]
    );
    await userEvent.click(
      await screen.findByRole('button', { name: 'Submit' })
    );

    expect(submitter).toHaveBeenLastCalledWith({
      criteria: {
        type: CriteriaCardGroupType.ALL_OF,
        criteria: [
          {
            type: CriteriaCardGroupType.ANY_OF,
            criteria: [
              {
                type: CriteriaCardGroupType.ALL_OF,
                criteria: [],
              },
            ],
          },
        ],
      },
    });
  });

  it('Delete button works as expected', async () => {
    renderWithValue({
      type: CriteriaCardGroupType.ALL_OF,
      criteria: [
        { type: CriteriaCardGroupType.ANY_OF, criteria: [] },
        { type: CriteriaCardGroupType.NONE_OF, criteria: [] },
      ],
    });

    await userEvent.click(
      (
        await screen.findAllByRole('button', { name: 'trash' })
      )[0]
    );
    await userEvent.click(
      await screen.findByRole('button', { name: 'Submit' })
    );

    expect(submitter).toHaveBeenLastCalledWith({
      criteria: {
        type: CriteriaCardGroupType.ALL_OF,
        criteria: [
          {
            type: CriteriaCardGroupType.NONE_OF,
            criteria: [],
          },
        ],
      },
    });
  });
});