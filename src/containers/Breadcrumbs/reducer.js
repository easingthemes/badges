import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  ADD_BREADCRUMBS,
  REMOVE_BREADCRUMBS,
} from './constants';

const initialState = fromJS({
  breadcrumbs: ['Home'],
  labels: {
    home: 'Home',
    pathways: '',
    badges: '',
    badge: '',
    badgeLevel: '',
  },
  active: 0
});

function breadcrumbsPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case ADD_BREADCRUMBS:
      return state
        .update('breadcrumbs', breadcrumbs => breadcrumbs.push(action.payload));

    case REMOVE_BREADCRUMBS:
      return state
        .update('breadcrumbs', breadcrumbs => breadcrumbs.filter(item => item !== action.payload));

    default:
      return state;
  }
}

export default breadcrumbsPageReducer;
