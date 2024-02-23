import {api} from "./apiService.ts";
import Product from "../classes/Product.ts";

export interface addProduct {
    name: string;
    price: number;
    description: string;
}

export const listProducts = async () => {
    const response = await api.get('/product/list');
    console.log(response.data)
    return response.data;
}
export const deleteProduct = async (id: number) => {
    const response = await api.delete(`/product/delete/${id}`);
    return response.data;
}
export const updateProduct = async (Product: Product) => {
    const response = await api.put(`/product/update/${Product.id}`, Product);
    return response.data;
}
export const getProduct = async (id: number) => {
    const response = await api.get(`/product/${id}`);
    return response.data;
}
export const createProduct = async (Product: addProduct) => {
    const response = await api.post('/product/add', Product);
    return response.data;
}