import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';

const FirstStep = ({ A1, A2, toggleCheckbox }) => (
  <div>
    <Checkbox
      label="A1"
      checked={A1}
      onCheck={() => toggleCheckbox('A1')}
    />
    <Checkbox
      label="A2"
      checked={A2}
      onCheck={() => toggleCheckbox('A2')}
    />
  </div>
);

FirstStep.propTypes = {
  A1: PropTypes.bool,
  A2: PropTypes.bool,
  toggleCheckbox: PropTypes.func.isRequired,
};

export default FirstStep;