import axios from 'axios';
import { filterIssues } from '../../helpers/filterIssues';
import { API_URL } from '../App/constants';

import {
    DEFAULT_ACTION,
    GET_BADGES,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getBadges(epicId) {
  return function(dispatch) {
    axios.get(`${API_URL}epic/${epicId}/issue`)
    .then(response => {
      dispatch({
        type: GET_BADGES,
        payload: filterIssues(response.data)
      });
    })
    .catch(error => {
      dispatch({
        type: GET_BADGES,
        payload: error
      });
    })
  }
}
