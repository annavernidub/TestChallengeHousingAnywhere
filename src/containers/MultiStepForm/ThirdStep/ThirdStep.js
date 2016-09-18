import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const UITextField = ({ input, label, meta: { touched }, textFieldError }) => (
  <TextField hintText={label} errorText={touched && textFieldError} {...input} />
);

UITextField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  textFieldError: PropTypes.string,
};

const ThirdStep = (props) => {
  const { handleSubmit, previousStep, textFieldValidated, textFieldError } = props;

  return (
    <form onSubmit={handleSubmit}>

      <Field
        name="text"
        component={UITextField}
        label="Input value..."
        textFieldError={textFieldError}
      />

      <RaisedButton
        type="button"
        label="check"
        onClick={() => props.validateTextField('multiStep', 'text')}
      />

      <div>
        <FlatButton type="button" label="back" onClick={previousStep} />
        <FlatButton type="submit" label="next" primary disabled={!textFieldValidated} />
      </div>
    </form>
  );
};

ThirdStep.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  validateTextField: PropTypes.func.isRequired,
  textFieldValidated: PropTypes.bool.isRequired,
  textFieldError: PropTypes.string,
};

export default reduxForm({
  form: 'multiStep',
  destroyOnUnmount: false,
})(ThirdStep);
