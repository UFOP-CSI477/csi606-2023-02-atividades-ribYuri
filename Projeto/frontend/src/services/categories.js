import { api } from "./api";

export const getCategories = async () => {
  const categories = await api.get("/products/categories");
  return categories.data;
};

export const getAllCategoriesIds = async () => {
  const categories = await api.get("/products/categories/all");
  return categories.data;
};

export const getProductsByCategory = async (category) => {
  const products = await api.get(`/products/category/${category}`);
  return products.data;
};
