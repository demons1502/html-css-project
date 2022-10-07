import { sendGet } from './axios';

export const getSpeechScript = (type, customerId) => sendGet(`/speech-scripts?type=${type}&customerId=${customerId}`);