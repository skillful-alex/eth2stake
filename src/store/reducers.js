import * as types from './actionTypes';
import Calculator from '../calculator';

const initialState = Calculator();

export function calc(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHANGED_BY_USER:
        return Calculator( { ...state, [action.name]: action.value } );
    default:
      return state;
  }
}