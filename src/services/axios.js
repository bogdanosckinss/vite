import axios from "axios";
const BASE_OAUTH_URL = import.meta.env.VITE_API_BACKEND_URL

export const axiosPrivate = axios.create({
  baseURL: BASE_OAUTH_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const $fetcher = axios.create({
  baseURL: BASE_OAUTH_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default function fetcher() {
  console.log(import.meta.env.VITE_API_BACKEND_URL)
  return $fetcher
}
