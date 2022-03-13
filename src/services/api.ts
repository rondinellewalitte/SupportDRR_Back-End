import axios from "axios";

export const api = axios.create({
  baseURL: process.env.SITE_SUPPORT,
  headers: {
    Cookie: process.env.COOKIE_KEY,
  },
});
