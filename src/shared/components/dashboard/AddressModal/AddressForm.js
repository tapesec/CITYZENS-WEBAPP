import React /* , { Fragment } */ from 'react';
import PropTypes from 'prop-types';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import { Button } from 'rmwc/Button';
import { Typography } from 'rmwc/Typography';
import { Grid, GridCell } from 'rmwc/Grid';
import { Icon } from 'rmwc/Icon';
import VALIDATION from './../../../constants/dataValidation';
import { renderCustomTextField } from './../../lib/form/customComponents';

const validate = values => {
    const errors = {};
    if (values.address && values.address.length > VALIDATION.HOTSPOT.ADDRESS.MAX_LENGTH) {
        errors.address = VALIDATION.HOTSPOT.ADDRESS.LABEL.ERROR;
    }
    return errors;
};

const warn = values => {
    const warnings = {};
    if (!values.address) {
        warnings.address = VALIDATION.HOTSPOT.ADDRESS.LABEL.WARNING;
    }
    return warnings;
};

const AddressForm = ({ handleSubmit, dismissModal }) => (
    <form className="AddressForm" onSubmit={handleSubmit}>
        <Grid>
            <GridCell span="12" phone="12" tablet="12">
                <Typography tag="h2" theme="text-on-primary-background" use="headline5">
                    <Icon theme="text-icon-on-background" strategy="ligature">
                        add_location
                    </Icon>
                    {"Nouveau point d'interêt"}
                </Typography>
                <Typography tag="h3" theme="text-on-primary-background" use="subtitle1">
                    {"L'adresse est elle exacte ?"}
                </Typography>
            </GridCell>
            <GridCell span="12" phone="12" tablet="12">
                <Field
                    name="address"
                    label="Corrigez si nécessaire (ne déplacera pas le point)"
                    component={renderCustomTextField}
                />
            </GridCell>
            <GridCell span="6" phone="12" tablet="12">
                <Button type="submit" raised theme="secondary-bg text-primary-on-secondary">
                    {"C'est bon !"}
                </Button>
            </GridCell>
            <GridCell span="6" phone="12" tablet="12">
                <Button
                    type="button"
                    onClick={dismissModal}
                    raised
                    theme="secondary-bg text-primary-on-secondary">
                    {'Annuler'}
                </Button>
            </GridCell>
        </Grid>
    </form>
);

AddressForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dismissModal: PropTypes.func.isRequired,
    meta: PropTypes.object, // eslint-disable-line
};

export default reduxForm({
    enableReinitialize: true,
    form: 'addressHotspot',
    validate,
    warn,
    shouldError: ({ props }) => props.invalids, // Prevent invalid form submission …
})(AddressForm);
