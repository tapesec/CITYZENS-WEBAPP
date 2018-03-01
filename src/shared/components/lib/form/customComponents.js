import React, { Fragment } from 'react';
import { TextField } from 'rmwc/TextField';
import { Switch } from 'rmwc/Switch';

export const renderCustomTextField = (label, withValidationMessages) => field => (
    <Fragment>
        <TextField theme="text-on-primary-background" label={label} {...field.input} />
        {withValidationMessages({ ...field.meta })}
    </Fragment>
);

export const renderCustomTextArea = (label, withValidationMessages) => field => (
    <Fragment>
        <TextField theme="text-on-primary-background" label={label} {...field.input} textarea fullwidth rows="8"/>
        {withValidationMessages({ ...field.meta })}
    </Fragment>
);

export const renderCustomSwitch = (
    [turnOnLabel, turnOffLabel],
    withValidationMessages,
    className,
) => field => (
    <div className={className}>
        <Switch label={field.input.value ? turnOnLabel : turnOffLabel} {...field.input} />
        {withValidationMessages({ ...field.meta })}
    </div>
);
