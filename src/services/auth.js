import { sendPost } from "./axios";

export const loginApi = (payload) => sendPost("api/login", payload);
