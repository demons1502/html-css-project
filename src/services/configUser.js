import {sendPost, sendPatch } from './axios';

export const updateUser = (payload) => sendPatch(`users/me/profile`, payload);
export const changePassword = (payload) => sendPost(`change-password/`, payload);
export const sendAvatar = (payload) => sendPost(`users/me/avatar-upload`, payload, {headers: { "Content-Type": "multipart/form-data" }});

