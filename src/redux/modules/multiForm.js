const NEXT_STEP = 'TestChallenge/steps/NEXT_STEP';
const PREV_STEP = 'TestChallenge/steps/PREV_STEP';
const SUBMIT_MULTI_STEP_FORM = 'TestChallenge/steps/SUBMIT_MULTI_STEP_FORM';
const SUBMIT_MULTI_STEP_FORM_SUCCESS = 'TestChallenge/steps/SUBMIT_MULTI_STEP_FORM_SUCCESS';
const SUBMIT_MULTI_STEP_FORM_FAILED = 'TestChallenge/steps/SUBMIT_MULTI_STEP_FORM_FAILED';

import { take, put } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import { submitIt } from '../../api';
import step1 from './step1';
import step2 from './step2';
import step3, { sagas as step3Sagas } from './step3';
import step4 from './step4';

const initialState = {
  activeStep: 1,
  maxStep: 6,
  nextStepAvailable: true,
  prevStepAvailable: false,
  textFieldValidated: false,
  textFieldError: null,
};

function general(state = initialState, action = {}) {
  switch (action.type) {
    case NEXT_STEP: {
      const activeStep = state.nextStepAvailable ? (state.activeStep + 1) : state.activeStep;

      return {
        ...state,
        activeStep,
        nextStepAvailable: activeStep !== state.maxStep,
        prevStepAvailable: activeStep !== 1,
      };
    }

    case PREV_STEP: {
      const activeStep = state.prevStepAvailable ? (state.activeStep - 1) : state.activeStep;

      return {
        ...state,
        activeStep,
        nextStepAvailable: activeStep !== state.maxStep,
        prevStepAvailable: activeStep !== 1,
      };
    }

    case SUBMIT_MULTI_STEP_FORM_SUCCESS: {
      return {
        ...state,
        activeStep: 6,
      };
    }

    case SUBMIT_MULTI_STEP_FORM_FAILED: {
      return {
        ...state,
        submitError: action.error,
      };
    }

    default:
      return state;
  }
}

export default combineReducers({
  general,
  step1,
  step2,
  step3,
  step4,
});

/*  ACTION CREATORS */
export function nextStep() {
  return {
    type: NEXT_STEP,
  };
}

export function prevStep() {
  return {
    type: PREV_STEP,
  };
}

export function submitMultiStepForm(data) {
  return {
    type: SUBMIT_MULTI_STEP_FORM,
    data,
  };
}

/*  ACTION CREATORS */

function formatRequestData(data) {
  const requestData = {
    text: data.text,
    c: data.c,
    a: [],
    b: data.B1 ? 'B1' : 'B2',
  };

  if (data.A1) {
    requestData.a.push('A1');
  }

  if (data.A1) {
    requestData.a.push('A2');
  }
}

/*  SAGAS */
export function* submitMultiStepFormSaga() {
  while (1) {
    const { data } = yield take(SUBMIT_MULTI_STEP_FORM);

    try {
      yield submitIt(formatRequestData(data));

      yield put({ type: SUBMIT_MULTI_STEP_FORM_SUCCESS });
    } catch (err) {
      yield put({ type: SUBMIT_MULTI_STEP_FORM_FAILED, error: err.message });
    }
  }
}

export const sagas = [
  submitMultiStepFormSaga,
  ...step3Sagas,
];
/*  SAGAS */
