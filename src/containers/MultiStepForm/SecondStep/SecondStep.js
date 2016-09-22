import React, { PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';

const SecondStep = ({ B1, B2, toggleButton}) => (
  <div>
    <Toggle
      label="B1"
      toggled={B1}
      labelPosition="right"
      onToggle={() => toggleButton("B1")}
    />
    <Toggle
      label="B2"
      toggled={B2}
      labelPosition="right"
      onToggle={() => toggleButton("B2")}
    />
  </div>
);

SecondStep.propTypes = {
  toggleButton: PropTypes.func.isRequired,
  B1: PropTypes.bool.isRequired,
  B2: PropTypes.bool.isRequired,
};

export default SecondStep;
