import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://lampross.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
// console.log(process.env.NEXT_PUBLIC_API_URL)

export default axiosInstance;
