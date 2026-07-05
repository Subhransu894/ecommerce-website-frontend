import axios from "axios"
const API = "https://ecommerce-website-backend-umber.vercel.app/api/auth"

export const registerUser = (userData)=>{
    return axios.post(`${API}/register`,userData)
}

export const loginUser = (userData)=>{
    return axios.post(`${API}/login`,userData)
}