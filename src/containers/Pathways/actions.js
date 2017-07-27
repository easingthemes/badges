import axios from 'axios';
import { API_URL } from '../App/constants';
import { filterEpics } from '../../helpers/filterEpics';
import {
    DEFAULT_ACTION,
    GET_PATHWAYS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getPathways(projectId) {
  return function(dispatch) {
    axios.get(`${API_URL}board/${projectId}/epic`)
    .then(response => {
      dispatch({
        type: GET_PATHWAYS,
        payload: filterEpics(response.data)
      });
    })
    .catch(error => {
      dispatch({
        type: GET_PATHWAYS,
        payload: error
      });
    })
  }
}
