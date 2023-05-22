import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import {
  ComparisonOperator,
  CriteriaCardGroupType,
  CriteriaCardTerminalType,
} from '../../../types/CriteriaTypes';
import { DataTokenType } from '../../../types/TokenTypes';
import DataTokenCardBody from './DataTokenCardBody';

describe('Constant conditional token', () => {
  describe('buttons work as expected', () => {
    const submitter = jest.fn();

    beforeEach(() => {
      render(
        withIntlConfiguration(
          <Form
            mutators={{ ...arrayMutators }}
            onSubmit={(v) => submitter(v)}
            initialValues={{
              test: {
                type: DataTokenType.CONSTANT_CONDITIONAL,
                conditions: [
                  {
                    type: CriteriaCardTerminalType.AGE,
                    numDays: '10',
                    value: 'if value 1',
                  },
                  {
                    type: CriteriaCardTerminalType.AMOUNT,
                    operator: ComparisonOperator.GREATER_THAN,
                    amountDollars: '20',
                    value: 'if value 2',
                  },
                ],
                else: 'fallback else',
              },
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <DataTokenCardBody name="test" />
                <button type="submit">Submit</button>
              </form>
            )}
          </Form>
        )
      );
    });

    it('delete works as expected', async () => {
      await userEvent.click(
        screen.getAllByRole('button', { name: 'trash' })[2]
      );

      await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

      expect(submitter).toHaveBeenLastCalledWith({
        test: {
          type: DataTokenType.CONSTANT_CONDITIONAL,
          conditions: [
            {
              type: CriteriaCardTerminalType.AGE,
              numDays: '10',
              value: 'if value 1',
            },
          ],
          else: 'fallback else',
        },
      });
    });

    it('reorder up works as expected', async () => {
      await userEvent.click(
        screen.getAllByRole('button', { name: 'caret-up' })[1]
      );

      await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

      expect(submitter).toHaveBeenLastCalledWith({
        test: {
          type: DataTokenType.CONSTANT_CONDITIONAL,
          conditions: [
            {
              type: CriteriaCardTerminalType.AMOUNT,
              operator: ComparisonOperator.GREATER_THAN,
              amountDollars: '20',
              value: 'if value 2',
            },
            {
              type: CriteriaCardTerminalType.AGE,
              numDays: '10',
              value: 'if value 1',
            },
          ],
          else: 'fallback else',
        },
      });
    });

    it('reorder down works as expected', async () => {
      await userEvent.click(
        screen.getAllByRole('button', { name: 'caret-down' })[0]
      );

      await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

      expect(submitter).toHaveBeenLastCalledWith({
        test: {
          type: DataTokenType.CONSTANT_CONDITIONAL,
          conditions: [
            {
              type: CriteriaCardTerminalType.AMOUNT,
              operator: ComparisonOperator.GREATER_THAN,
              amountDollars: '20',
              value: 'if value 2',
            },
            {
              type: CriteriaCardTerminalType.AGE,
              numDays: '10',
              value: 'if value 1',
            },
          ],
          else: 'fallback else',
        },
      });
    });

    it('add works as expected', async () => {
      await userEvent.click(
        screen.getByRole('button', { name: 'Add condition' })
      );
      await userEvent.type(
        screen.getAllByRole('textbox', { name: 'Then use:' })[2],
        'if value 3'
      );

      await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

      expect(submitter).toHaveBeenLastCalledWith({
        test: {
          type: DataTokenType.CONSTANT_CONDITIONAL,
          conditions: [
            {
              type: CriteriaCardTerminalType.AGE,
              numDays: '10',
              value: 'if value 1',
            },
            {
              type: CriteriaCardTerminalType.AMOUNT,
              operator: ComparisonOperator.GREATER_THAN,
              amountDollars: '20',
              value: 'if value 2',
            },
            {
              type: CriteriaCardGroupType.ALL_OF,
              value: 'if value 3',
            },
          ],
          else: 'fallback else',
        },
      });
    });
  });
});
