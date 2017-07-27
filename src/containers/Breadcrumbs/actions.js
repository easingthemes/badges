import {
  DEFAULT_ACTION,
  ADD_BREADCRUMBS,
  REMOVE_BREADCRUMBS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addBreadcrumbs(label) {
  return function(dispatch) {
    dispatch({
      type: ADD_BREADCRUMBS,
      payload: label
    });
  }
}

export function removeBreadcrumbs(label) {
  return function(dispatch) {
    dispatch({
      type: REMOVE_BREADCRUMBS,
      payload: label
    });
  }
}
