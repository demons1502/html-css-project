import { sendPost } from "./axios";
import {ENDPOINT} from "../config/endpoint";

export const loginApi = (payload) => sendPost(ENDPOINT.auth.login, payload);
export const resetPasswordApi = (payload) => sendPost(ENDPOINT.auth.resetPassword, payload);
