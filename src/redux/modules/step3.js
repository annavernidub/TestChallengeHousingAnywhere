const CHANGE_TEXT_FIELD = 'TestChallenge/step3/CHANGE_TEXT_FIELD';

const VALIDATE_TEXT_FIELD = 'TestChallenge/step3/VALIDATE_TEXT_FIELD';
const VALIDATE_TEXT_FIELD_SUCCESS = 'TestChallenge/step3/VALIDATE_TEXT_FIELD_SUCCESS';
const VALIDATE_TEXT_FIELD_FAILED = 'TestChallenge/step3/VALIDATE_TEXT_FIELD_FAILED';

import { take, put } from 'redux-saga/effects';
import { checkIt } from '../../api';

const initialState = {
  text: '',
  isStepValid: false,
  validating: false,
  textFieldError: '',
};

export default function step1(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_TEXT_FIELD: {
      return {
        ...state,
        text: action.value,
        isStepValid: false,
      };
    }

    case VALIDATE_TEXT_FIELD: {
      return {
        ...state,
        validating: true,
        textFieldError: null,
      };
    }

    case VALIDATE_TEXT_FIELD_SUCCESS: {
      return {
        ...state,
        isStepValid: true,
        validating: false,
        textFieldError: null,
      };
    }

    case VALIDATE_TEXT_FIELD_FAILED: {
      return {
        ...state,
        isStepValid: false,
        validating: false,
        textFieldError: action.error,
      };
    }

    default:
      return state;
  }
}

/*  ACTION CREATORS */
export function changeTextField(value) {
  return {
    type: CHANGE_TEXT_FIELD,
    value,
  };
}

export function validateTextField(value) {
  return {
    type: VALIDATE_TEXT_FIELD,
    value,
  };
}
/*  ACTION CREATORS */

/*  SAGAS */
export function* validateTextFieldSaga() {
  while (1) {
    const { value } = yield take(VALIDATE_TEXT_FIELD);

    try {
      yield checkIt(value);

      yield put({ type: VALIDATE_TEXT_FIELD_SUCCESS });
    } catch (err) {
      yield put({ type: VALIDATE_TEXT_FIELD_FAILED, error: err.message });
    }
  }
}

export const sagas = [
  validateTextFieldSaga,
];
/*  SAGAS */
