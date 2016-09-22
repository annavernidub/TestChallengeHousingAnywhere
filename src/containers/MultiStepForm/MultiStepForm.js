import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

import FlatButton from 'material-ui/FlatButton';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {
  nextStep,
  prevStep,
  submitMultiStepForm,
} from 'redux/modules/multiForm';

import { toggleCheckbox } from 'redux/modules/step1';
import { toggleButton } from 'redux/modules/step2';
import { changeTextField, validateTextField } from 'redux/modules/step3';

import FirstStep from './FirstStep/FirstStep';
import FourthStep from './FourthStep/FourthStep';
import SecondStep from './SecondStep/SecondStep';
import ThirdStep from './ThirdStep/ThirdStep';

import styles from './MultiStepForm.scss';

const MultiStepForm = (props) => (
  <div className={styles.stepper}>
    <Stepper activeStep={props.activeStep - 1}>
      <Step>
        <StepLabel>Step 1</StepLabel>
      </Step>
      <Step>
        <StepLabel>Step 2</StepLabel>
      </Step>
      <Step>
        <StepLabel>Step 3</StepLabel>
      </Step>
      <Step>
        <StepLabel>Step 4</StepLabel>
      </Step>
      <Step>
        <StepLabel>Step 5</StepLabel>
      </Step>
      <Step>
        <StepLabel>Finish</StepLabel>
      </Step>
    </Stepper>

    <div className={styles.stepContent}>
      <form onSubmit={props.submitMultiStepForm}>
        {
          props.activeStep >= 1 &&
          <FirstStep toggleCheckbox={props.toggleCheckbox}
            A1={props.step1.A1}
            A2={props.step1.A2}
          />
        }
        {
          props.activeStep >= 2 &&
          <SecondStep toggleButton={props.toggleButton}
            B1={props.step2.B1}
            B2={props.step2.B2}
          />
        }
        {
          props.activeStep === 3 &&
          <ThirdStep inputValue={props.step3.text}
            validateTextField={props.validateTextField}
            changeTextField={props.changeTextField}
            textFieldError={props.step3.textFieldError}
            validating={props.step3.validating}
          />
        }
        {
          props.activeStep === 4 &&
          <FourthStep />
        }
        {
          props.activeStep === 5 &&
          <div>{props.submitError}</div>
        }
        {
          props.activeStep === 6 &&
          <div>Form was succesfully submitted</div>
        }

        <div>
          {
            props.activeStep > 1 && props.activeStep < 5 &&
            <FlatButton type="button" label="back" onClick={props.prevStep} />
          }
          {
            props.activeStep < 5 &&
            <FlatButton type="button"
              label="next"
              primary
              disabled={!props[`step${props.activeStep}`].isStepValid}
              onClick={props.nextStep}
            />
          }
          {
            props.activeStep === 5 &&
            <FlatButton type="submit" label="submit" primary name="submit" />
          }
        </div>
      </form>
    </div>
  </div>
);

MultiStepForm.propTypes = {
  activeStep: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  toggleButton: PropTypes.func.isRequired,
  submitMultiStepForm: PropTypes.func.isRequired,
  validateTextField: PropTypes.func.isRequired,
  changeTextField: PropTypes.func.isRequired,
  textFieldValidated: PropTypes.bool.isRequired,
  textFieldError: PropTypes.string,
  submitError: PropTypes.string,
  step1: PropTypes.object.isRequired,
  step2: PropTypes.object.isRequired,
  step3: PropTypes.object.isRequired,
};

export default connect(
  ({ multiForm }) => ({
    activeStep: multiForm.general.activeStep,
    textFieldValidated: multiForm.general.textFieldValidated,
    textFieldError: multiForm.general.textFieldError,
    submitError: multiForm.general.submitError,
    step1: multiForm.step1,
    step2: multiForm.step2,
    step3: multiForm.step3,
  }),
  {
    prevStep,
    nextStep,
    submitMultiStepForm,
    toggleCheckbox,
    toggleButton,
    changeTextField,
    validateTextField,
  }
)(MultiStepForm);
