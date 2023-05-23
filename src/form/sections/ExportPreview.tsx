import React from 'react';
import css from './ExportPreview.module.css';
import { Card, Checkbox } from '@folio/stripes/components';
import classNames from 'classnames';
import { Field, useField } from 'react-final-form';
import ExportPreviewData from '../../components/ExportPreview/ExportPreviewData';

export default function ExportPreview() {
  const wrap = useField<boolean>('preview.wrap', {
    subscription: { value: true },
    format: (value) => value ?? true,
  }).input.value;

  return (
    <>
      <Card
        headerStart="Export preview"
        bodyClass={classNames(css.preview, { [css.wrap]: wrap })}
      >
        <ExportPreviewData />
      </Card>
      <Field name="preview.wrap" type="checkbox" defaultValue={true}>
        {(fieldProps) => (
          <Checkbox {...fieldProps} fullWidth label="Wrap long lines" />
        )}
      </Field>
      <Field name="preview.invisible" type="checkbox" defaultValue={false}>
        {(fieldProps) => (
          <Checkbox
            {...fieldProps}
            fullWidth
            label="Display invisible characters (newlines, tabs, and spaces)"
          />
        )}
      </Field>
    </>
  );
}
