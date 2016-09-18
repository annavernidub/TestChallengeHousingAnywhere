import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';

const UIToggle = ({ input, label }) => (
  <Toggle
    label={label}
    toggled={!!input.value}
    labelPosition="right"
    onToggle={input.onChange}
  />
);

UIToggle.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

const validate = values => {
  const errors = {};

  if (!values.B1 && !values.B2) {
    errors._error = 'Please, choose at least one option';
  }

  return errors;
};

const SecondStep = (props) => {
  const { handleSubmit, previousStep, error } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name="B1" component={UIToggle} label="B1" />
      <Field name="B2" component={UIToggle} label="B2" />

      <div>
        <FlatButton type="button" label="back" onClick={previousStep} />
        <FlatButton type="submit" label="next" primary disabled={!!error} />
      </div>
    </form>
  );
};

SecondStep.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default reduxForm({
  form: 'multiStep',
  destroyOnUnmount: false,
  validate,
})(SecondStep);
