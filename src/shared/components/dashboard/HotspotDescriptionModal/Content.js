import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'rmwc/Typography';
import { Grid, GridCell } from 'rmwc/Grid';
import { Button, ButtonIcon } from 'rmwc/Button';
import ImageCDN from './../../lib/ImageCDN';

const Content = ({ title, icon, description, submitActions, cancelAction }) => (
    <Grid>
        <GridCell span="12" phone="12" tablet="12">
            <Typography tag="h2" use="headline5" theme="text-primrary-on-background">
                {title}
            </Typography>
        </GridCell>
        <GridCell span="4" phone="12" tablet="12">
            <ImageCDN filename={icon} alt="Point d'alerte" />
        </GridCell>
        <GridCell span="8" phone="12" tablet="8">
            <Typography tag="p" use="body1" theme="text-primary-on-background">
                {description}
            </Typography>
        </GridCell>
        <GridCell span="6" phone="12" tablet="6">
            {submitActions.map(action => (
                <Button
                    key={action.icon}
                    type="submit"
                    onClick={action.func}
                    raised
                    theme="secondary-bg text-primary-on-secondary">
                    <ButtonIcon use={action.icon} />
                    {action.label}
                </Button>
            ))}
        </GridCell>
        <GridCell span="6" phone="12" tablet="6">
            <Button
                type="button"
                onClick={cancelAction}
                raised
                theme="secondary-bg text-primary-on-secondary">
                <ButtonIcon use="close" />
                Fermer
            </Button>
            <GridCell />
        </GridCell>
    </Grid>
);

Content.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    submitActions: PropTypes.arrayOf(PropTypes.object).isRequired,
    cancelAction: PropTypes.func.isRequired,
};

export default Content;
