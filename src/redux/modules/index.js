import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import multiForm, { sagas as multiFormSagas } from './multiForm';


export default combineReducers({
  multiForm,
});

const sagas = [
  ...multiFormSagas,
];

export function* rootSaga() {
  yield sagas.map(fork);
}
