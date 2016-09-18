import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import FlatButton from 'material-ui/FlatButton';

const FifthStep = (props) => {
  const { handleSubmit, previousStep, submitError } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>{submitError}</div>
      <div>
        <FlatButton type="button" label="back" onClick={previousStep} />
        <FlatButton type="submit" label="submit" primary name="submit" />
      </div>
    </form>
  );
};

FifthStep.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  submitError: PropTypes.string,
};

export default reduxForm({
  form: 'multiStep',
  destroyOnUnmount: false,
})(FifthStep);
