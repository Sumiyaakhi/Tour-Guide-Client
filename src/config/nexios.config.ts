import { Nexios } from "nexios-http";

const nexiosInstance = new Nexios({
  baseURL: "https://wayfarer-world-server.vercel.app/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default nexiosInstance;
