import * as types from './actionTypes';

export function onChangedByUser(name, value) {
  return {
    type: types.CHANGED_BY_USER,
    name,
    value,
  };
}