import customer from "../classes/Customer.ts";
import {api} from "./apiService.ts";

export interface addCustomer {
    name: string;
    email: string;
    phone: string;
    address: string;
}
export const createCustomer = async (Customer: addCustomer) => {
    const response = await api.post('/customer/add', Customer);
    return response.data;
}
export const listCustomers = async () => {
    const response = await api.get('/customer/list');
    return response.data;
}
export const deleteCustomer = async (id: number) => {
    const response = await api.delete(`/customer/delete/${id}`);
    return response.data;
}
export const updateCustomer = async (Customer: customer) => {
    const response = await api.put(`/customer/update/${Customer.id}`, Customer);
    return response.data;
}
export const getCustomer = async (id: number) => {
    const response = await api.get(`/customer/${id}`);
    return response.data;
}
