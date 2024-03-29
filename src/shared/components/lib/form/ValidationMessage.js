import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'rmwc/Icon';
import { TextFieldHelperText } from 'rmwc/TextField';
import './ValidationMessage.scss';

const TextFieldValidationMessages = ({ messages, valid }) => {
    const style = { color: '#b00020', opacity: '1' };
    if (valid) {
        style.color = 'green';
    }
    return messages.map(message => (
        <TextFieldHelperText style={style} validationMsg key={Math.random() * (100000 - 1) + 1}>
            <Icon strategy="ligature" style={{ verticalAlign: 'middle', fontSize: '0.75rem' }}>
                close
            </Icon>
            {message}
        </TextFieldHelperText>
    ));
};

TextFieldValidationMessages.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.string),
};

TextFieldValidationMessages.defaultProps = {
    messages: [],
};

export default TextFieldValidationMessages;
