import { sendDelete, sendGet, sendPost } from './axios';

export const create = (params) => sendPost('transactions', params);
export const getAll = (params) => sendGet('transactions/search', params);
export const remove = (params) => sendDelete('transactions', params);

export const importFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
};
