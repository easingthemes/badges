import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_PATHWAYS,
} from './constants';

const initialState = fromJS({
  total: 0,
  pathways: [],
});

function pathwaysPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_PATHWAYS:
      return state
        .set('pathways', action.payload.epics)
        .set('total', action.payload.total);
    default:
      return state;
  }
}

export default pathwaysPageReducer;
