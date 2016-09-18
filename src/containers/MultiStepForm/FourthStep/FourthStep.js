import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

const UISelectField = ({ input, label, children }) => (
  <SelectField
    floatingLabelText={label}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
  />
);

UISelectField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

const validate = values => {
  const errors = {};

  if (!values.c) {
    errors._error = 'Required';
  }

  return errors;
};

const FourthStep = (props) => {
  const { handleSubmit, previousStep, error } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name="c" component={UISelectField} label="Select Box">
        <MenuItem value="C1" primaryText="C1" />
        <MenuItem value="C2" primaryText="C2" />
        <MenuItem value="C3" primaryText="C3" />
      </Field>

      <div>
        <FlatButton type="button" label="back" onClick={previousStep} />
        <FlatButton type="submit" label="next" primary disabled={!!error} />
      </div>
    </form>
  );
};

FourthStep.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default reduxForm({
  form: 'multiStep',
  destroyOnUnmount: false,
  validate,
})(FourthStep);
