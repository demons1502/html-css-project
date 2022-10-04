import { sendDelete, sendGet, sendPost, sendPut, sendPatch } from './axios';

export const createContracts = (payload) => sendPost('contracts', payload);
export const getSpeechScript = (payload) => sendGet(`speech-scripts?type=${payload}`);
export const update = ({id, data}) => sendPatch(`contracts/${id}`, data);
export const remove = (id) => sendDelete(`contract/${id}`);
export const getById = (params) => sendGet(`contracts/${params}`);
export const getAppointments = (payload) => sendGet(`appointments?titles=${payload.titles}&startDate=${payload.startDate}&endDate=${payload.endDate}`);
