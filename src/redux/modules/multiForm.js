const NEXT_STEP = 'TestChallenge/steps/NEXT_STEP';
const PREV_STEP = 'TestChallenge/steps/PREV_STEP';
const SUBMIT_MULTI_STEP_FORM = 'TestChallenge/steps/SUBMIT_MULTI_STEP_FORM';
const SUBMIT_MULTI_STEP_FORM_SUCCESS = 'TestChallenge/steps/SUBMIT_MULTI_STEP_FORM_SUCCESS';
const SUBMIT_MULTI_STEP_FORM_FAILED = 'TestChallenge/steps/SUBMIT_MULTI_STEP_FORM_FAILED';

const VALIDATE_TEXT_FIELD = 'TestChallenge/steps/VALIDATE_TEXT_FIELD';
const VALIDATE_TEXT_FIELD_SUCCESS = 'TestChallenge/steps/VALIDATE_TEXT_FIELD_SUCCESS';
const VALIDATE_TEXT_FIELD_FAILED = 'TestChallenge/steps/VALIDATE_TEXT_FIELD_FAILED';

import { take, put, select } from 'redux-saga/effects';

import { checkIt, submitIt } from '../../api';

const initialState = {
  activeStep: 1,
  maxStep: 6,
  nextStepAvailable: true,
  prevStepAvailable: false,
  textFieldValidated: false,
  textFieldError: null,
};

export default function clientsReducer(state = initialState, action = {}) {
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

    case VALIDATE_TEXT_FIELD_SUCCESS: {
      return {
        ...state,
        textFieldValidated: true,
        textFieldError: null,
      };
    }

    case VALIDATE_TEXT_FIELD_FAILED: {
      return {
        ...state,
        textFieldValidated: false,
        textFieldError: action.error,
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

export function validateTextField(form, field) {
  return {
    type: VALIDATE_TEXT_FIELD,
    form,
    field,
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

export function* validateTextFieldSaga() {
  while (1) {
    const { form, field } = yield take(VALIDATE_TEXT_FIELD);
    const value = yield select((state) => (
      state.form[form] &&
      state.form[form].values &&
      state.form[form].values[field]
    ));

    try {
      yield checkIt(value);

      yield put({ type: VALIDATE_TEXT_FIELD_SUCCESS });
    } catch (err) {
      yield put({ type: VALIDATE_TEXT_FIELD_FAILED, error: err.message });
    }
  }
}

export const sagas = [
  submitMultiStepFormSaga,
  validateTextFieldSaga,
];
/*  SAGAS */
