import { sendGet, sendPost, sendPatch, sendDelete } from './axios';

export const getAppointmentsApi = (payload) =>
  sendGet('/appointments', payload);

export const creactAppointmentApi = (payload) =>
  sendPost('/appointment', payload);

export const editAppointmentApi = (id, payload) =>
  sendPatch(`/appointments/${id}`, payload);

export const deleteAppointmentApi = (id) => sendDelete(`/appointments/${id}`);
