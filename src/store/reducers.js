import * as types from './actionTypes';
import Calculator from '../calculator';

const initialState = Calculator();

export function calc(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHANGED_BY_USER:
        window.gtag('event', 'CHANGED_BY_USER', {
          'event_category': 'calc',
          'event_label': action.name +':'+ action.value,
        });
        return Calculator( { ...state, [action.name]: action.value } );
    default:
      return state;
  }
}