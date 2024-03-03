import axios from "axios";
export const HOST_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3333"
    : `${window.location.origin}`;

export const BASE_URL = (axios.defaults.baseURL = "http://localhost:3333/api");

export const serviceDefaultConfig = {
  baseURL: BASE_URL,
};
