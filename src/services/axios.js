import Axios from 'axios';
import configs from '../config';

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: configs.API_DOMAIN
})

axiosInstance.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    // const token = Cookies.get('token');
    // if (token) {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1hbnVsaWZlLmNvbSIsImlkIjoiZjc5MWI1ODEtYzU0Zi00OWQ5LWEwN2MtMTc1YTJlMzA2OWI2IiwiaWF0IjoxNjYzNTYyNTk2LCJleHAiOjE2NjM2NDg5OTZ9.3nFUPQkPBpVne5thoAf3jmReNFqj-2qJkxxalyU5LAY`;
    // }
    return config;
  },
  (error) => Promise.resolve(error)
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const sendGet = (url, params) =>
  axiosInstance.get(url, { params }).then((res) => res);
export const sendPost = (url, params) =>
  axiosInstance.post(url, params).then((res) => res);
export const sendPut = (url, params, headers) =>
  axiosInstance.put(url, params, headers).then((res) => res);
export const sendPatch = (url, params) =>
  axiosInstance.patch(url, params).then((res) => res);
export const sendDelete = (url, params) =>
  axiosInstance.delete(url, { params }).then((res) => res);
export const sendDeletes = (url, params) =>
  axiosInstance.delete(url, {data:params}).then((res) => res);
