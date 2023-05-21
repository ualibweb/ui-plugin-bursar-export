import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import { FormValues } from '../form/types';
import withIntlConfiguration from '../test/util/withIntlConfiguration';
import CriteriaCard from './CriteriaCard';
import { QueryClient, QueryClientProvider } from 'react-query';

const getResponse = jest.fn((endpoint: string) => {
  if (endpoint.startsWith('location-units/institutions')) {
    return {
      locinsts: [
        {
          id: '40ee00ca-a518-4b49-be01-0638d0a4ac57',
          name: 'Test institution',
        },
      ],
    };
  } else if (endpoint.startsWith('location-units/campuses')) {
    return {
      loccamps: [
        {
          id: '62cf76b7-cca5-4d33-9217-edf42ce1a848',
          name: 'Matching campus 1',
          institutionId: '40ee00ca-a518-4b49-be01-0638d0a4ac57',
        },
        {
          id: 'f239fd5d-6e62-52fe-b640-28e853aa2abd',
          name: 'Matching campus 2',
          institutionId: '40ee00ca-a518-4b49-be01-0638d0a4ac57',
        },
        {
          id: '62cf76b7-cca5-4d33-9217-edf42ce1a848',
          name: 'Non-matching campus',
          institutionId: 'a83bdecc-5e33-58a7-8f84-177af3edad66',
        },
      ],
    };
  } else if (endpoint.startsWith('location-units/libraries')) {
    return {
      loclibs: [
        {
          id: '5d78803e-ca04-4b4a-aeae-2c63b924518b',
          name: 'Matching library',
          campusId: '62cf76b7-cca5-4d33-9217-edf42ce1a848',
        },
        {
          id: 'c2549bb4-19c7-4fcc-8b52-39e612fb7dbe',
          name: 'Non-matching library',
          campusId: '470ff1dd-937a-4195-bf9e-06bcfcd135df',
        },
      ],
    };
  } else if (endpoint.startsWith('locations')) {
    return {
      locations: [
        {
          id: 'fcd64ce1-6995-48f0-840e-89ffa2288371',
          name: 'Matching location 1',
          libraryId: '5d78803e-ca04-4b4a-aeae-2c63b924518b',
        },
        {
          id: '758258bc-ecc1-41b8-abca-f7b610822ffd',
          name: 'Matching location 2',
          libraryId: '5d78803e-ca04-4b4a-aeae-2c63b924518b',
        },
        {
          id: '184aae84-a5bf-4c6a-85ba-4a7c73026cd5',
          name: 'Non-matching location',
          libraryId: 'c2549bb4-19c7-4fcc-8b52-39e612fb7dbe',
        },
      ],
    };
  } else {
    throw new Error(`Unknown endpoint in mock: ${endpoint}`);
  }
});

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => ({
    get: (endpoint: string) => ({
      json: () => Promise.resolve(getResponse(endpoint)),
    }),
  }),
}));

it('Location criteria displays appropriate form', async () => {
  const submitter = jest.fn();

  render(
    withIntlConfiguration(
      <QueryClientProvider client={new QueryClient()}>
        <Form<FormValues>
          mutators={{ ...arrayMutators }}
          onSubmit={(v) => submitter(v)}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <CriteriaCard name="criteria" root alone />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      </QueryClientProvider>
    )
  );

  async function expectOptionInDocument(option: string) {
    expect(
      await screen.findByRole('option', { name: option })
    ).toBeInTheDocument();
  }
  async function expectOptionNotInDocument(option: string) {
    expect(screen.queryByRole('option', { name: option })).toBeNull();
  }

  await userEvent.selectOptions(screen.getByRole('combobox'), 'Item location');

  await expectOptionInDocument('Test institution');
  await expectOptionNotInDocument('Matching campus 1');
  await expectOptionNotInDocument('Matching campus 2');
  await expectOptionNotInDocument('Non-matching campus');
  await expectOptionNotInDocument('Matching library');
  await expectOptionNotInDocument('Non-matching library');
  await expectOptionNotInDocument('Matching location 1');
  await expectOptionNotInDocument('Matching location 2');
  await expectOptionNotInDocument('Non-matching location');

  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Institution' }),
    'Test institution'
  );

  await expectOptionInDocument('Matching campus 1');
  await expectOptionInDocument('Matching campus 2');
  await expectOptionNotInDocument('Non-matching campus');
  await expectOptionNotInDocument('Matching library');
  await expectOptionNotInDocument('Non-matching library');
  await expectOptionNotInDocument('Matching location 1');
  await expectOptionNotInDocument('Matching location 2');
  await expectOptionNotInDocument('Non-matching location');

  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Campus' }),
    'Matching campus 1'
  );

  await expectOptionInDocument('Matching library');
  await expectOptionNotInDocument('Non-matching library');
  await expectOptionNotInDocument('Matching location 1');
  await expectOptionNotInDocument('Matching location 2');
  await expectOptionNotInDocument('Non-matching location');

  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Campus' }),
    'Matching campus 2'
  );

  await expectOptionNotInDocument('Matching library');
  await expectOptionNotInDocument('Non-matching library');
  await expectOptionNotInDocument('Matching location 1');
  await expectOptionNotInDocument('Matching location 2');
  await expectOptionNotInDocument('Non-matching location');

  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Campus' }),
    'Matching campus 1'
  );

  await expectOptionInDocument('Matching library');
  await expectOptionNotInDocument('Non-matching library');
  await expectOptionNotInDocument('Matching location 1');
  await expectOptionNotInDocument('Matching location 2');
  await expectOptionNotInDocument('Non-matching location');

  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Library' }),
    'Matching library'
  );

  await expectOptionInDocument('Matching location 1');
  await expectOptionInDocument('Matching location 2');
  await expectOptionNotInDocument('Non-matching location');

  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Location' }),
    'Matching location 1'
  );

  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

  expect(submitter).toHaveBeenCalledWith({
    criteria: {
      type: 'Location',
      institutionId: '40ee00ca-a518-4b49-be01-0638d0a4ac57',
      campusId: '62cf76b7-cca5-4d33-9217-edf42ce1a848',
      libraryId: '5d78803e-ca04-4b4a-aeae-2c63b924518b',
      locationId: 'fcd64ce1-6995-48f0-840e-89ffa2288371',
    },
  });
});
