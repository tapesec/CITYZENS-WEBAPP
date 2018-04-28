import reduxForm from 'redux-form/lib/reduxForm';
import MessageForm, { validate } from './MessageForm';

const EditMessageFormContainer = reduxForm({
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    forceUnregisterOnUnmount: false,
    form: 'editHotspotMessageForm',
    shouldError: ({ props }) => props.invalid,
    validate,
})(MessageForm);

export default EditMessageFormContainer;
