import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {
  nextStep,
  prevStep,
  submitMultiStepForm,
  validateTextField,
} from 'redux/modules/multiForm';

import FifthStep from './FifthStep/FifthStep';
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
      {
        props.activeStep === 1 &&
        <FirstStep onSubmit={props.nextStep} />
      }

      {
        props.activeStep === 2 &&
        <SecondStep previousStep={props.prevStep} onSubmit={props.nextStep} />
      }
      {
        props.activeStep === 3 &&
        <ThirdStep
          previousStep={props.prevStep}
          onSubmit={props.nextStep}
          validateTextField={props.validateTextField}
          textFieldValidated={props.textFieldValidated}
          textFieldError={props.textFieldError}
        />
      }
      {
        props.activeStep === 4 &&
        <FourthStep previousStep={props.prevStep} onSubmit={props.nextStep} />
      }
      {
        props.activeStep === 5 &&
        <FifthStep
          previousStep={props.prevStep}
          onSubmit={props.submitMultiStepForm}
          submitError={props.submitError}
        />
      }
      {
        props.activeStep === 6 &&
        <div>Form was succesfully submitted</div>
      }
    </div>
  </div>
);

MultiStepForm.propTypes = {
  activeStep: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  submitMultiStepForm: PropTypes.func.isRequired,
  validateTextField: PropTypes.func.isRequired,
  textFieldValidated: PropTypes.bool.isRequired,
  textFieldError: PropTypes.string,
  submitError: PropTypes.string,
};

export default connect(
  ({ multiForm }) => ({
    activeStep: multiForm.activeStep,
    textFieldValidated: multiForm.textFieldValidated,
    textFieldError: multiForm.textFieldError,
    submitError: multiForm.submitError,
  }),
  {
    prevStep,
    nextStep,
    submitMultiStepForm,
    validateTextField,
  }
)(MultiStepForm);
