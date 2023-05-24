import { render, screen } from '@testing-library/react';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import ExportPreview from './ExportPreview';
import { DataTokenType, HeaderFooterTokenType } from '../../types/TokenTypes';
import userEvent from '@testing-library/user-event';

jest.mock('@faker-js/faker', () => ({
  faker: {
    number: {
      int: jest.fn(() => 2),
      float: jest.fn(() => 12.34),
    },
  },
}));

describe('Export preview component', () => {
  it('wraps lines when selected', async () => {
    const { container } = render(
      <Form mutators={{ ...arrayMutators }} onSubmit={jest.fn()}>
        {() => <ExportPreview />}
      </Form>
    );

    // when undefined
    expect(container.querySelector('.wrap')).toBeVisible();

    await userEvent.click(
      screen.getByRole('checkbox', { name: 'Wrap long lines' })
    );
    expect(container.querySelector('.wrap')).toBeNull();

    await userEvent.click(
      screen.getByRole('checkbox', { name: 'Wrap long lines' })
    );
    expect(container.querySelector('.wrap')).toBeVisible();
  });
});
