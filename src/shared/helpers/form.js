/**
 *
 * @param {object} formState this.state
 * @param {string} fieldName the name of the form field
 * @param {function} fieldValidator
 * @param {string} inputValue
 * @description return a newState ready to pass to setState react component function and validated if fieldName is already touched
 */
const validateAndUpdateFieldStateOnChange = (formState, fieldName, fieldValidator, inputValue) => {
    const newState = {};
    newState.formValues = {
        ...formState.formValues,
        [fieldName]: inputValue,
    };
    if (formState.validate[fieldName] && formState.validate[fieldName].touched) {
        const validateObject = fieldValidator(newState.formValues);
        newState.validate = {
            ...formState.validate,
            [fieldName]: {
                touched: true,
                ...validateObject,
            },
        };
    }
    return newState;
};

/**
 *
 * @param {object} formState
 * @param {string} fieldName
 * @param {function} fieldValidator
 * @param {string} inputValue
 * @description same as validateAndUpdateFieldStateOnChange but set field as touched
 */
const validateAndUpdateFieldStateOnBlur = (formState, fieldName, fieldValidator) => {
    const newState = {};
    const validateObject = fieldValidator(formState.formValues);
    const newFieldStatus = {
        ...validateObject,
        touched: true,
    };
    newState.validate = {
        ...formState.validate,
        [fieldName]: newFieldStatus,
    };
    return newState;
};

/**
 *
 * @param {object} formState this.state
 * @param {Array} fieldsAndValidators an array of object with fieldName and a validator function
 */
const formStatusBeforeSubmit = (formState, fieldsAndValidators) => {
    const newFormState = { ...formState };
    fieldsAndValidators.forEach(currentField => {
        const validateObject = currentField.validator(formState.formValues);
        newFormState.validate[currentField.name] = {
            ...validateObject,
            touched: true,
        };
    });
    const isInvalid = fieldsAndValidators.some(currentField => {
        const validateObject = currentField.validator(formState.formValues);
        return validateObject.isValid === false;
    });
    return {
        isValid: !isInvalid,
        newStateToUpdate: newFormState,
    };
};

const formHelpers = {
    validateAndUpdateFieldStateOnChange,
    validateAndUpdateFieldStateOnBlur,
    formStatusBeforeSubmit,
};

export default formHelpers;
