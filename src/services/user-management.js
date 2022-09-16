import { sendPost, sendGet, sendDelete } from "./axios";
import axios, { Axios } from "axios";

export const create = (payload) => sendPost('api/users', payload)
export const getUser = () => sendGet('api/user/me')
export const getSearch = (payload) => sendGet('api/user/search', payload)
//export const update = (id, payload) => sendPut(`api/update/${id}`, payload)
export const remove = (id) => sendDelete(`api/users/${id}`)






var config = {
  headers: { Authorization: `Bearer ${eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1hbnVsaWZlLmNvbSIsImlkIjoiOWI2YThmMjktNzNhMy00ZGM3LWEyZWMtZDg4MGRmNzY0MGFhIiwiaWF0IjoxNjYzMjk4NjI3LCJleHAiOjE2NjMzODUwMjd9.qkZrb_7KoMuxKqBY5e8AzawfH4xoMQ86SEuow2vzDYI}` }
};
const url = 'http://118.71.224.167:8608/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1hbnVsaWZlLmNvbSIsImlkIjoiOWI2YThmMjktNzNhMy00ZGM3LWEyZWMtZDg4MGRmNzY0MGFhIiwiaWF0IjoxNjYzMjk4NjI3LCJleHAiOjE2NjMzODUwMjd9.qkZrb_7KoMuxKqBY5e8AzawfH4xoMQ86SEuow2vzDYI'

export const getUserTest = () =>
  axios.get('http://118.71.224.167:8608/api/users/me')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })

