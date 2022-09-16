import { sendDelete, sendGet, sendPost, sendPut } from './axios';

export const create = (type, payload) => sendPost(`api/${type}`, payload);
export const getAll = (type, params) => sendGet(`api/${type}`, params);
export const update = (type, id, payload) =>
  sendPut(`api/${type}/${id}`, payload);
export const remove = (type, id) => sendDelete(`api/${type}/${id}`);
