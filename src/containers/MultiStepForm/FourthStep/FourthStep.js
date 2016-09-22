import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const FourthStep = ({ selectedOption, selectOption, disabled }) => (
  <SelectField
    floatingLabelText="Select Box"
    value={selectedOption}
    onChange={(event, index, value) => selectOption(value)}
    disabled={disabled}
  >
    <MenuItem value="C1" primaryText="C1" />
    <MenuItem value="C2" primaryText="C2" />
    <MenuItem value="C3" primaryText="C3" />
  </SelectField>
);

FourthStep.propTypes = {
  selectOption: PropTypes.func.isRequired,
  selectedOption: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
};

export default FourthStep;
