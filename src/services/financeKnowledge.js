import { sendGet } from './axios';

export const getAll = (params) => sendGet(`api/articles`, params);
export const getMostView = () => sendGet('api/articles/most-view');
