import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const ThirdStep = ({
  changeTextField,
  validateTextField,
  inputValue,
  textFieldError,
  validating,
  disabled,
  }) => (
  <div>
    <TextField
      hintText="Input value..."
      errorText={textFieldError}
      disabled={validating || disabled}
      value={inputValue}
      onChange={event => changeTextField(event.target.value)}
    />

    <RaisedButton
      type="button"
      label="check"
      disabled={validating || disabled}
      onClick={() => validateTextField(inputValue)}
    />
  </div>
);
ThirdStep.propTypes = {
  changeTextField: PropTypes.func.isRequired,
  validateTextField: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  validating: PropTypes.bool.isRequired,
  textFieldError: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
};

export default ThirdStep;
