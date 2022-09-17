import Axios from 'axios';
import configs from '../config';

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: configs.API_DOMAIN,
});


axiosInstance.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    // const token = Cookies.get('token');
    // if (token) {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1hbnVsaWZlLmNvbSIsImlkIjoiOWI2YThmMjktNzNhMy00ZGM3LWEyZWMtZDg4MGRmNzY0MGFhIiwiaWF0IjoxNjYzMzk4ODMzLCJleHAiOjE2NjM0ODUyMzN9.PN61PjXBMo5huAE8OlCt8BI6Jv66JUtlVJzAL-yJfek`;
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
export const sendPut = (url, params) =>
  axiosInstance.put(url, params).then((res) => res);
export const sendPatch = (url, params) =>
  axiosInstance.patch(url, params).then((res) => res);
export const sendDelete = (url, params) =>
  axiosInstance.delete(url, { params }).then((res) => res);
