import { sendGet, sendPost, sendPatch, sendDelete } from './axios';

export const getAppointmentsApi = (payload) =>
  sendGet(`/appointments?title=${payload.titles}&startDate=${payload.startDate}&endDate=${payload.endDate}`);

export const creactAppointmentApi = (payload) =>
  sendPost('/appointment', payload);

export const editAppointmentApi = (id, payload) =>
  sendPatch(`/appointments/${id}`, payload);

export const deleteAppointmentApi = (id) => sendDelete(`/appointments/${id}`);

export const getAppointmentApi = (id) => sendGet(`/appointments/${id}`);


