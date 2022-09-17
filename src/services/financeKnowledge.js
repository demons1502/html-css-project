import { sendGet } from './axios';
import { ENDPOINT } from '../config/endpoint'

export const getAll = (params) => sendGet(ENDPOINT.financeKnowledge.getArticles, params);
export const getMostView = () => sendGet('articles/most-view');
