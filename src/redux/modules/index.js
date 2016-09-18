import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { fork } from 'redux-saga/effects';
import multiForm, { sagas as multiFormSagas } from './multiForm';

const REDUX_FORM_CHANGE = 'redux-form/CHANGE';

export default combineReducers({
  multiForm,
  form: form.plugin({
    multiStep: (state, action) => {
      switch (action.type) {
        case REDUX_FORM_CHANGE: {
          if (action.meta.field === 'B1') {
            return {
              ...state,
              values: {
                ...state.fields,
                B1: action.payload,
                B2: !action.payload,
              },
            };
          }

          if (action.meta.field === 'B2') {
            return {
              ...state,
              values: {
                ...state.fields,
                B2: action.payload,
                B1: !action.payload,
              },
            };
          }

          return state;
        }

        default:
          return state;
      }
    },
  }),
});

const sagas = [
  ...multiFormSagas,
];

export function* rootSaga() {
  yield sagas.map(fork);
}

