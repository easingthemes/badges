import axios from 'axios';

import { API_URL } from '../App/constants';

import {
    DEFAULT_ACTION,
    GET_BADGE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getBadge(badgeId, isIssue) {
  const badgePath = isIssue ? 'issue' : 'badge';
  return function(dispatch) {
    axios.get(`${API_URL}${badgePath}/${badgeId}`)
    .then(response => {
      dispatch({
        type: GET_BADGE,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_BADGE,
        payload: error
      });
    })
  }
}
