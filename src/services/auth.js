import { sendGet, sendPost } from './axios';

export const loginApi = (payload) => sendPost('api/login', payload);
export const resetPasswordApi = (payload) =>
  sendPost('api/reset-password', payload);
export const changePasswordApi = (payload) =>
  sendPost('api/change-password', payload);
export const getMeApi = (payload) => sendGet('api/user/me', payload);
