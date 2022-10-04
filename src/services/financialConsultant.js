import { sendGet, sendPost } from './axios';

export const addNewConsult = (payload) => sendPost('/consults', payload);
export const getConsult = (payload) => sendGet('/consults', payload);
export const getConsultById = (id) => sendGet(`/consults/${id}`);
export const deleteConsult = (id) => sendGet(`/consults/${id}`);
export const getSpeechScript = () => sendGet('/speech-scripts?type=consult');
