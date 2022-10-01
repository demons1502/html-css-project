import axios from "axios";
import configs from "../config";
import store from "../store";

import { message } from "antd";

const baseApiConfig = {
  baseURL: configs.API_DOMAIN,
  headers: {
    "content-type": "application/json",
  },
  timeout: 60000, // 60s
};

const SESSION_EXPIRED_STATUS_CODE = 401;

const baseApiClient = axios.create(baseApiConfig);

const request = ({
  enableFlashMessageError = true,
  enableFlashMessageSuccess = false,
  messageError = "",
  messageSuccess = "",
  isAuth = true,
  ...options
}) => {
  if (isAuth) {
    const { accessToken } = store.getState().auth;
    baseApiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  const onSuccess = (response) => {
    enableFlashMessageSuccess &&
      messageSuccess &&
      message.success(messageSuccess);
    return response;
  };

  const onError = (error) => {
    error.response.status !== SESSION_EXPIRED_STATUS_CODE &&
      enableFlashMessageError &&
      error.response?.data?.message &&
      messageError;
    message.error(messageError);

    return Promise.reject(error.response);
  };

  return baseApiClient(options).then(onSuccess).catch(onError);
};

export default request;
