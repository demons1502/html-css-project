import { sendPost, sendGet, sendDelete, sendPut } from "./axios";
import axios, { Axios } from "axios";

export const create = (payload) => sendPost('users', payload)
export const getUser = () => sendGet('api/user/me')
export const getSearch = (payload) => sendGet(`users/search?q=${payload.q}&page=${payload.page}&limit=${payload.limit}`)
export const getAll = () => sendGet('/users/search?page=1&limit=10')
export const update = (payload) => sendPut('users', payload)
export const resetUser = (payload) => sendPost('users/bulk-reinit', payload)
// export const uploadFile = (payload) => sendPost('users/bulk-create-upload', payload, {headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" }})
export const remove = (payload) => sendDelete(`users/${payload}`)
export const removeUsers = (payload) => sendDelete('users', {data: {usersIds: payload}})

export const uploadFile = (file) => {
  formData.append('file', file)
  const formData = new FormData();
  const url = process.env.REACT_APP_API_DOMAIN
  console.log(url);
  return axios({
    method: 'post',
    url: `${url}users/bulk-create-upload`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" }
  });
};
