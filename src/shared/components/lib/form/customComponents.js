import React, { Fragment } from 'react';
import { TextField } from 'rmwc/TextField';
import { Switch } from 'rmwc/Switch';
import ValidationMessage from './ValidationMessage';

/* export const renderCustomTextField = (label, withValidationMessages) => field => (
    <Fragment>
        <TextField theme="text-on-primary-background" label={label} {...field.input} />
        {withValidationMessages({ ...field.meta })}
    </Fragment>
); */

export const renderCustomTextField = field => (
    <Fragment>
        <TextField theme="text-on-primary-background" label={field.label} {...field.input} />
        <ValidationMessage {...field.meta} />
    </Fragment>
);

export const renderCustomTextArea = field => (
    <Fragment>
        <TextField
            theme="text-on-primary-background"
            label={field.label}
            {...field.input}
            textarea
            fullwidth
            rows="8"
        />
        <ValidationMessage {...field.meta} />
    </Fragment>
);

export const renderCustomSwitch = field => (
    <div className={field.cssClass}>
        <Switch label={field.input.value ? field.labelOn : field.labelOff} {...field.input} />
        <ValidationMessage {...field.meta} />
    </div>
);
