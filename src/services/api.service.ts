import { globalaxiosInstance } from "./axiosSetup";

export const getProducts = (filter: any) => {
  return globalaxiosInstance.post(`/api/product`, filter);
};

export const getCategories = () => {
  return globalaxiosInstance.get("/api/category/");
};

export const getLocation = (filter: any) => {
  return globalaxiosInstance.post(`/api/pincode/`, filter);
};