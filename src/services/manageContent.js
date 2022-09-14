import { sendDelete, sendGet, sendPost, sendPut } from './axios';

export const create = (option, payload) => sendPost(`api/${option}`, payload);
export const getAll = (option, params) => sendGet(`api/${option}`, params);
export const update = (option, id, payload) =>
  sendPut(`api/${option}/${id}`, payload);
export const remove = (option, id) => sendDelete(`api/${option}/${id}`);
