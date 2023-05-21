import { render, screen } from '@testing-library/react';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../test/util/withIntlConfiguration';
import FormValues from '../../types/FormValues';
import SchedulingFrequency from '../../types/SchedulingFrequency';
import SchedulingMenu, { getIntervalLabel } from './SchedulingMenu';

const noop = () => ({});

describe('Scheduling menu', () => {
  it('Shows no interval field label when in manual mode', () => {
    expect(getIntervalLabel(SchedulingFrequency.Manual)).toBe('');
  });

  it('Manual (never) option does not show extra fields', () => {
    render(
      withIntlConfiguration(
        <Form<FormValues>
          onSubmit={noop}
          initialValues={{
            scheduling: { frequency: SchedulingFrequency.Manual },
          }}
        >
          {() => <SchedulingMenu />}
        </Form>
      )
    );

    // no interval, weekdays, or time
    expect(screen.queryAllByRole('textbox')).toHaveLength(0);
  });

  it('Hours option shows interval option only', async () => {
    render(
      withIntlConfiguration(
        <Form<FormValues>
          onSubmit={noop}
          initialValues={{
            scheduling: { frequency: SchedulingFrequency.Hours },
          }}
        >
          {() => <SchedulingMenu />}
        </Form>
      )
    );

    expect(screen.queryAllByRole('textbox')).toHaveLength(1);
    expect(
      await screen.findByRole('textbox', { name: 'Hours between runs' })
    ).toBeVisible();
  });

  it('Days option shows interval and start time options only', async () => {
    render(
      withIntlConfiguration(
        <Form<FormValues>
          onSubmit={noop}
          initialValues={{
            scheduling: { frequency: SchedulingFrequency.Days },
          }}
        >
          {() => <SchedulingMenu />}
        </Form>
      )
    );

    expect(screen.queryAllByRole('textbox')).toHaveLength(2);
    expect(
      await screen.findByRole('textbox', { name: 'Days between runs' })
    ).toBeVisible();
    expect(
      await screen.findByRole('textbox', {
        name: (name) => name.startsWith('Run at'),
      })
    ).toBeVisible();
  });

  it('Weeks option shows all options', async () => {
    render(
      withIntlConfiguration(
        <Form<FormValues>
          onSubmit={noop}
          initialValues={{
            scheduling: { frequency: SchedulingFrequency.Weeks },
          }}
        >
          {() => <SchedulingMenu />}
        </Form>
      )
    );

    expect(screen.queryAllByRole('textbox')).toHaveLength(3);
    expect(
      await screen.findByRole('textbox', { name: 'Weeks between runs' })
    ).toBeVisible();
    expect(
      await screen.findByRole('textbox', {
        name: (name) => name.startsWith('Run at'),
      })
    ).toBeVisible();
    expect(
      await screen.findByRole('textbox', { name: 'Run on weekdays' })
    ).toBeVisible();
  });
});
