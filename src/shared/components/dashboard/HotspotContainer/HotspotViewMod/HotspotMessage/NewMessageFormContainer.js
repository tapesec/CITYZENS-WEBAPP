import reduxForm from 'redux-form/lib/reduxForm';
import MessageForm, { validate } from './MessageForm';

const NewMessageFormContainer = reduxForm({
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    forceUnregisterOnUnmount: false,
    form: 'newHotspotMessageForm',
    shouldError: ({ props }) => props.invalid,
    validate,
})(MessageForm);

export default NewMessageFormContainer;
