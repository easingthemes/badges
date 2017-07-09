import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_BADGES,
} from './constants';

const initialState = fromJS({
  total: 0,
  badges: [],
});

function badgesPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_BADGES:
        const badges = action.payload.issues || [];
        const total = action.payload.total || 0;
      console.log(typeof action.payload.issues);
        console.log(action.payload.issues);
      return state
        .set('badges', badges)
        .set('total', total);
    default:
      return state;
  }
}

export default badgesPageReducer;
