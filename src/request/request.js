import axios from 'axios';
import BASE_URL from "../constants"

export function posttrending(body) {

    const promise = axios.post(`${BASE_URL}/timeline`, body);
    return promise;
  }

export function gettrending(token,limit) {

  const promise = axios.get(`${BASE_URL}/timeline/${limit}`, {headers: {"authorization":`Bearer: ${token}`}});
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
