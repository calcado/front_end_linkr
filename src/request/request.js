import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export function posttrending(body, token) {

  const promise = axios.post(`${BASE_URL}/timeline`, body, {headers: {"authorization":`Bearer: ${token}`}});
  return promise;
}

export function gettrending(token) {

  const promise = axios.get(`${BASE_URL}/timeline`, {headers: {"authorization":`Bearer: ${token}`}});
  return promise;
}

export function deletepost(id) {
  const promise = axios.delete(`${BASE_URL}/timeline/posts`, {headers: {id}});
  return promise;

}

export function editpost(id,text) {
  const promise = axios.patch(`${BASE_URL}/editpost/${id}`, {text});
  return promise;

}