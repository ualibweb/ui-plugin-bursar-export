import { render, screen } from '@testing-library/react';
import React, { ComponentType } from 'react';
import BursarExportPlugin from './BursarExportPlugin';
import { useStripes } from '@folio/stripes/core';
import withIntlConfiguration from './test/util/withIntlConfiguration';
import useInitialValues from './hooks/useInitialValues';
import { Form, FormProps } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FORM_ID } from './form/ConfigurationForm';
import userEvent from '@testing-library/user-event';
import formValuesToDto from './api/dto/to/formValuesToDto';

jest.mock('@folio/stripes/core', () => ({
  useStripes: jest.fn(),
}));
jest.mock('./api/mutators/useManualSchedulerMutation', () => jest.fn());
jest.mock(
  './api/mutators/useAutomaticSchedulerMutation',
  () => () => jest.fn()
);
jest.mock('./hooks/useInitialValues', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('@folio/stripes/final-form', () => ({
  __esModule: true,
  default: () => (Component: ComponentType) => (props: FormProps) =>
    (
      <Form mutators={{ ...arrayMutators }} {...props}>
        {(formProps) => <Component {...formProps} {...props} />}
      </Form>
    ),
}));
jest.mock('./api/queries/useFeeFineOwners', () => ({
  __esModule: true,
  default: () => ({ data: [], isSuccess: true }),
}));

jest.mock('./api/queries/useTransferAccounts', () => ({
  __esModule: true,
  default: () => ({ data: [], isSuccess: true }),
}));

describe('BursarExportPlugin', () => {
  it('Renders the plugin with null initial values', () => {
    (useInitialValues as jest.Mock).mockReturnValue(null);

    render(withIntlConfiguration(<BursarExportPlugin />));

    expect(screen.getByText('Transfer configuration')).toBeVisible();
    expect(document.getElementById(FORM_ID)).toBeNull();
  });

  it('Renders the plugin with initial values', async () => {
    (useInitialValues as jest.Mock).mockReturnValue({});
    (useStripes as jest.Mock).mockReturnValue({ hasPerm: () => true });

    render(withIntlConfiguration(<BursarExportPlugin />));

    expect(screen.getByText('Transfer configuration')).toBeVisible();
    expect(document.getElementById(FORM_ID)).not.toBeNull();
    expect(screen.getByText('Account data format')).toBeVisible();
  });
});
