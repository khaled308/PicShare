import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL + "/api/auth";

export const registerApi = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, data);
    return response.data;
  } catch (error) {
    throw (error.response && error.response.data) || error;
  }
};

export const loginApi = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, data);
    return response.data;
  } catch (error) {
    throw (error.response && error.response.data) || error;
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await axios.put(`${BASE_URL}/verify-email/${token}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw (error.response && error.response.data) || error;
  }
};
