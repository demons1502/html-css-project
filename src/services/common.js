import { sendGet } from './axios';

export const getSpeechScript = (type) => sendGet(`/speech-scripts?type=${type}`);