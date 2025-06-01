import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:3000/api", // cambia al backend real
    timeout: 10000 ,
    headers: {
    'Content-Type': 'application/json'}
})
