import axios from "axios";
const domain = process.env.NEXT_PUBLIC_APP_URL;
const BASE_URL = domain + "/api/";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
