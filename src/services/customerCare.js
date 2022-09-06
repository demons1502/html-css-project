import {sendGet, sendPost, sendPut, sendDelete} from './axios';

export const create = (payload) => sendPost('api/create', payload)
export const getAll = (payload) => sendGet('api/get-all', payload)
export const update = (id, payload) => sendPut(`api/update/${id}`, payload)
export const remove = (id) => sendDelete(`api/remove/${id}`)