import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'rmwc/Typography';
import './ValidationMessage.scss';

const ValidationMessage = ({ touched, error, warning }) => {
    if (touched) {
        if (error)
            return (
                <Typography
                    tag="span"
                    className="cityzen-form-label-error"
                    theme="text-on-primary-background"
                    use="subheading2">
                    {error}
                </Typography>
            );
        if (warning)
            return (
                <Typography
                    tag="span"
                    className="cityzen-form-label-warning"
                    theme="text-on-primary-background"
                    use="subheading2">
                    {warning}
                </Typography>
            );
        return '';
    }
    return '';
};

ValidationMessage.propTypes = {
    touched: PropTypes.bool.isRequired,
    error: PropTypes.shape({}).isRequired,
    warning: PropTypes.shape({}).isRequired,
};

export default ValidationMessage;
