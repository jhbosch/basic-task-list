import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'content-type': "application/json; charset=utf-8",
    "access-control-allow-origin": "*",
    "access-control-allow-credentials": "true",
  }
});
