import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonIcon } from 'rmwc/Button';

import './SubmitButtons.scss';

const SubmitButtons = ({
    cancelAction,
    submitAction,
    cancelLabel,
    cancelIcon,
    submitLabel,
    submitIcon,
}) => (
    <div className="SubmitButtons">
        {submitLabel ? (
            <Button type="submit" onClick={submitAction} raised theme="secondary-bg">
                {submitIcon ? <ButtonIcon use={submitIcon} /> : null}
                {submitLabel}
            </Button>
        ) : null}

        {cancelLabel ? (
            <Button
                type="button"
                onClick={cancelAction}
                raised
                theme="secondary-bg text-primary-on-secondary">
                {cancelIcon ? <ButtonIcon use={cancelIcon} /> : null}
                {cancelLabel}
            </Button>
        ) : null}
    </div>
);

SubmitButtons.propTypes = {
    cancelAction: PropTypes.func,
    submitAction: PropTypes.func,
    cancelLabel: PropTypes.string,
    cancelIcon: PropTypes.string,
    submitLabel: PropTypes.string,
    submitIcon: PropTypes.string,
};

SubmitButtons.defaultProps = {
    cancelAction: () => {},
    submitAction: () => {},
    cancelLabel: undefined,
    cancelIcon: undefined,
    submitLabel: undefined,
    submitIcon: undefined,
};

export default SubmitButtons;
