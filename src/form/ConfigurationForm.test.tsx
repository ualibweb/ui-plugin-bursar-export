import { render, screen } from '@testing-library/react';
import arrayMutators from 'final-form-arrays';
import React, { ComponentType } from 'react';
import { Form, FormProps } from 'react-final-form';
import withIntlConfiguration from '../test/util/withIntlConfiguration';
import ConfigurationForm from './ConfigurationForm';

jest.mock('@folio/stripes/final-form', () => ({
  __esModule: true,
  default: () => (Component: ComponentType) => (props: FormProps) =>
    (
      <Form mutators={{ ...arrayMutators }} {...props}>
        {(formProps) => <Component {...formProps} {...props} />}
      </Form>
    ),
}));

jest.mock('../api/queries/useFeeFineOwners', () => ({
  __esModule: true,
  default: () => ({ data: [], isSuccess: true }),
}));

jest.mock('../api/queries/useTransferAccounts', () => ({
  __esModule: true,
  default: () => ({ data: [], isSuccess: true }),
}));

describe('Configuration form', () => {
  it('Render the configuration form', () => {
    render(
      withIntlConfiguration(
        <ConfigurationForm
          formApiRef={{ current: null }}
          initialValues={{ aggregate: false }}
          onSubmit={jest.fn()}
        />
      )
    );

    screen.debug();

    expect(screen.getByText('Account data format')).toBeVisible();

    // you should test the conditions for with/without aggregate
    // (can `userEvent.click the checkbox, but you may need to open the accordion)
    // you could also re-render and pass alternative initial values
  });
});
