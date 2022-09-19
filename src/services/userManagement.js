import { sendPost, sendGet, sendDelete, sendGetNoParam } from "./axios";
import axios, { Axios } from "axios";

export const create = (payload) => sendPost('api/users', payload)
export const getUser = () => sendGet('api/user/me')
export const getSearch = (payload) => sendGet(`users/search?q=${payload.q}&page=${payload.page}&limit=${payload.limit}`)
export const getAll = () => sendGet('/users/search?page=1&limit=10')
export const update = (id, payload) => sendPut(`api/update/${id}`, payload)
export const remove = (id) => sendDelete(`api/users/${id}`)

const user={
  email: "thang12w3@gmail.com",
  loginId: "12354297",
  password: "123456",
  fullname: "thang",
  phone: "1238512565",
  location: "hanoi",
  isAdmin: true,
  isProduct: true,
  isPaid: true
}

export const getUserTest = () =>
  axios.get(`http://118.71.224.167:8608/api/users/search?page=1&limit=10`,
    {
      headers:{
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1hbnVsaWZlLmNvbSIsImlkIjoiOWI2YThmMjktNzNhMy00ZGM3LWEyZWMtZDg4MGRmNzY0MGFhIiwiaWF0IjoxNjYzMzAxNjIyLCJleHAiOjE2NjMzODgwMjJ9.F3cbW0NdNGXJ3Tt08-XdDvTkvB69yRnggwu-OLLMJjE`,
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })

export const postUserTest = () =>
  axios.post('http://118.71.224.167:8608/api/users', user,
    {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1hbnVsaWZlLmNvbSIsImlkIjoiOWI2YThmMjktNzNhMy00ZGM3LWEyZWMtZDg4MGRmNzY0MGFhIiwiaWF0IjoxNjYzMzAxNjIyLCJleHAiOjE2NjMzODgwMjJ9.F3cbW0NdNGXJ3Tt08-XdDvTkvB69yRnggwu-OLLMJjE`,
      }})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  