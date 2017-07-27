import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_BADGE,
} from './constants';

const initialState = fromJS({
  badge: {},
});

function badgePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_BADGE:
      return state
        .set('badge', action.payload);
    default:
      return state;
  }
}

export default badgePageReducer;
