import { render, screen } from '@testing-library/react';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../test/util/withIntlConfiguration';
import {
  CriteriaCardGroupType,
  CriteriaCardTerminalType,
} from '../../types/CriteriaTypes';
import FormValues from '../../types/FormValues';
import CriteriaCardToolbox from './CriteriaCardToolbox';

const noop = () => ({});

describe('Criteria card toolbox', () => {
  it('Default outer type results in no buttons', () => {
    render(
      withIntlConfiguration(
        <Form<FormValues> mutators={{ ...arrayMutators }} onSubmit={noop}>
          {() => <CriteriaCardToolbox prefix="criteria." root alone />}
        </Form>
      )
    );

    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it.each([
    CriteriaCardGroupType.ALL_OF,
    CriteriaCardGroupType.ANY_OF,
    CriteriaCardGroupType.NONE_OF,
  ])('Outer group type %s results in only add', async (type) => {
    render(
      withIntlConfiguration(
        <Form<FormValues>
          mutators={{ ...arrayMutators }}
          onSubmit={noop}
          initialValues={{ criteria: { type } }}
        >
          {() => <CriteriaCardToolbox prefix="criteria." root alone />}
        </Form>
      )
    );

    expect(screen.queryAllByRole('button')).toHaveLength(1);
    expect(
      await screen.findByRole('button', { name: 'plus-sign' })
    ).toBeVisible();
  });

  it.each([
    CriteriaCardGroupType.ALL_OF,
    CriteriaCardGroupType.ANY_OF,
    CriteriaCardGroupType.NONE_OF,
  ])('Inner group type %s results in add and delete', async (type) => {
    render(
      withIntlConfiguration(
        <Form<FormValues>
          mutators={{ ...arrayMutators }}
          onSubmit={noop}
          initialValues={{ criteria: { type } }}
        >
          {() => (
            <CriteriaCardToolbox
              prefix="criteria."
              root={false}
              alone={false}
            />
          )}
        </Form>
      )
    );

    expect(screen.queryAllByRole('button')).toHaveLength(2);
    expect(
      await screen.findByRole('button', { name: 'plus-sign' })
    ).toBeVisible();
    expect(await screen.findByRole('button', { name: 'trash' })).toBeVisible();
    expect(
      await screen.findByRole('button', { name: 'trash' })
    ).not.toHaveAttribute('disabled');
  });

  it.each([
    CriteriaCardGroupType.ALL_OF,
    CriteriaCardGroupType.ANY_OF,
    CriteriaCardGroupType.NONE_OF,
  ])(
    'Inner group type alone %s results in add and disabled delete',
    async (type) => {
      render(
        withIntlConfiguration(
          <Form<FormValues>
            mutators={{ ...arrayMutators }}
            onSubmit={noop}
            initialValues={{ criteria: { type } }}
          >
            {() => (
              <CriteriaCardToolbox prefix="criteria." root={false} alone />
            )}
          </Form>
        )
      );

      expect(screen.queryAllByRole('button')).toHaveLength(2);
      expect(
        await screen.findByRole('button', { name: 'plus-sign' })
      ).toBeVisible();
      expect(
        await screen.findByRole('button', { name: 'trash' })
      ).toBeVisible();
      expect(
        await screen.findByRole('button', { name: 'trash' })
      ).toHaveAttribute('disabled');
    }
  );

  it.each([CriteriaCardTerminalType.AGE, CriteriaCardTerminalType.LOCATION])(
    'Inner type alone %s has disabled delete',
    async (type) => {
      render(
        withIntlConfiguration(
          <Form<FormValues>
            mutators={{ ...arrayMutators }}
            onSubmit={noop}
            initialValues={{ criteria: { type } }}
          >
            {() => (
              <CriteriaCardToolbox prefix="criteria." root={false} alone />
            )}
          </Form>
        )
      );

      expect(screen.queryAllByRole('button')).toHaveLength(1);
      expect(
        await screen.findByRole('button', { name: 'trash' })
      ).toBeVisible();
      expect(
        await screen.findByRole('button', { name: 'trash' })
      ).toHaveAttribute('disabled');
    }
  );

  it.each([CriteriaCardTerminalType.AGE, CriteriaCardTerminalType.LOCATION])(
    'Inner type not alone %s has enabled delete',
    async (type) => {
      render(
        withIntlConfiguration(
          <Form<FormValues>
            mutators={{ ...arrayMutators }}
            onSubmit={noop}
            initialValues={{ criteria: { type } }}
          >
            {() => (
              <CriteriaCardToolbox prefix="criteria." root={false} alone />
            )}
          </Form>
        )
      );

      expect(screen.queryAllByRole('button')).toHaveLength(1);
      expect(
        await screen.findByRole('button', { name: 'trash' })
      ).toBeVisible();
      expect(
        await screen.findByRole('button', { name: 'trash' })
      ).toHaveAttribute('disabled', '');
    }
  );
});
