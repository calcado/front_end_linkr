import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export function posttrending(body) {

    const promise = axios.post(`${BASE_URL}/timeline`, body);
    return promise;
  }

  export function gettrending() {

    const promise = axios.get(`${BASE_URL}/timeline`);
    return promise;
  }