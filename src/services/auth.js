import { sendPost } from "./axios";

export const loginApi = (payload) => sendPost("api/login", payload);
export const resetPasswordApi = (payload) =>
  sendPost("api/reset-password", payload);
