import axios from 'axios';

import { GLOBAL } from '../App/constants';
import { responseTest } from '../../config/FE-issue.js';
import {
    DEFAULT_ACTION,
    GET_BADGES,
} from './constants';

const API_URL = GLOBAL.API_URL;
const EPIC_PATH = GLOBAL.EPIC_PATH;

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getBadges() {
  return function(dispatch) {
      axios.get(`${API_URL}/${EPIC_PATH}/NCPW-61/issue`)
    .then(response => {
      dispatch({
        type: GET_BADGES,
        payload: response.data
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_BADGES,
        payload: responseTest
      });
    })
  }
}
