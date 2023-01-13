import axios from 'axios';
import BASE_URL from "../constants"

export function posttrending(body) {

    const promise = axios.post(`${BASE_URL}/timeline`, body);
    return promise;
  }

  export function gettrending(token) {

    const promise = axios.get(`${BASE_URL}/timeline`, {headers: {"authorization":`Bearer: ${token}` }});
    return promise;
  }