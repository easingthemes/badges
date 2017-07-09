import axios from 'axios';

import { GLOBAL } from '../App/constants';

import {
    DEFAULT_ACTION,
    GET_BADGES,
} from './constants';

const API_URL = GLOBAL.API_URL;
const EPIC_PATH = GLOBAL.EPIC_PATH;
const responseJson = require('../../response/index.json');

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
        console.log(responseJson);
      dispatch({
        type: GET_BADGES,
        payload: responseJson
      });
    })
  }
}
