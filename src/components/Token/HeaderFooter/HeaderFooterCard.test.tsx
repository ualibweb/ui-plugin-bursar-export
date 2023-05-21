import { render, screen } from '@testing-library/react';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import HeaderFooterCard from './HeaderFooterCard';

test('Header/footer card renders appropriately', async () => {
  render(
    withIntlConfiguration(
      <Form mutators={{ ...arrayMutators }} onSubmit={() => ({})}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <HeaderFooterCard
              fieldArrayName="test"
              name="test[0]"
              index={0}
              isLast
            />
          </form>
        )}
      </Form>
    )
  );

  expect(await screen.findByRole('combobox')).toBeVisible();
});
