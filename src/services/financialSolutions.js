import { sendDelete, sendGet, sendPost, sendPut, sendPatch } from './axios';

export const getSpeechScript = (payload) => sendGet(`speech-scripts?type=${payload}`);
export const getCustomerContract = (payload) => sendGet(`customers/contracts?limit=20&offset=0`, payload);
export const remove = (id) => sendDelete(`contract/${id}`);
export const getById = (params) => sendGet(`contracts/${params}`);
export const getAppointments = (payload) => sendGet(`appointments?titles=${payload.titles}&startDate=${payload.startDate}&endDate=${payload.endDate}`);
export const getAppointmentsById = (payload) => sendGet(`appointments/${payload}`);
export const postSaveFinance = (payload) => sendPost(`finance-solutions`, payload)
