import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';

const UICheckbox = ({ input, label }) => (
  <Checkbox label={label}
    checked={!!input.value}
    onCheck={input.onChange}
  />
);

UICheckbox.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

const validate = values => {
  const errors = {};

  if (!values.A1 && !values.A2) {
    errors._error = 'Please, choose at least one option';
  }

  return errors;
};

const FirstStep = (props) => {
  const { handleSubmit, pristine, error } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name="A1" component={UICheckbox} label="A1" />
      <Field name="A2" component={UICheckbox} label="A2" />

      <div>
        <FlatButton type="submit" label="next" primary disabled={ pristine || !!error } />
      </div>
    </form>
  );
};

FirstStep.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default reduxForm({
  form: 'multiStep',
  destroyOnUnmount: false,
  validate,
})(FirstStep);
