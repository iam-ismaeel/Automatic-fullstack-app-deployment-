// lib/api.ts
import axiosInstance from "./axios";
import axios from "axios";
import { handleApiError } from "./errorHandler";

export const signIn = async (data: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post("/connect/login", data);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

export const signUp = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  country_id: string;
  state_id: string;
  terms: 0;
}) => {
  try {
    const response = await axiosInstance.post("/connect/signup", data);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

export const forgotPassword = async (data: { email: string }) => {
  try {
    const response = await axiosInstance.post("/connect/forgot/password", data);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

export const resetPassword = async (data: {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  try {
    const response = await axiosInstance.post("/connect/reset/password", data);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

export const emailVerification = async (data: {
  email: string;
  code: string;
}) => {
  try {
    const response = await axiosInstance.post("/connect/verify/email", data);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

export const loginVerify = async (data: { email: string; code: string }) => {
  try {
    const response = await axiosInstance.post("/connect/login/verify", data);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

export const fetchUserLocation = async () => {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    // console.log("User IP data:", response.data);
    return {
      countryCode: response.data.country_code,
      currency: response.data.currency,
    };
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};
