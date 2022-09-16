import { sendDelete, sendGet, sendPost, sendPut } from './axios';

export const create = (type, payload) => sendPost(`${type}`, payload);
export const getAll = (type, params) => sendGet(`${type}`, params);
export const update = (type, id, payload) => sendPut(`${type}/${id}`, payload);
export const remove = (type, id) => sendDelete(`${type}/${id}`);
