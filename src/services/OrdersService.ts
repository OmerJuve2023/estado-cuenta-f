import {api} from "./apiService.ts";
import {Orders} from "../classes/Orders.ts";

export const createOrder = async (order: Orders) => {
    const response = await api.post('/order/add', order);
    return response.data;
}
export const listOrders = async () => {
    const response = await api.get('/order/list');
    console.log(response.data)
    return response.data;
}
export const deleteOrder = async (id: number) => {
    const response = await api.delete(`/order/delete/${id}`);
    return response.data;
}
export const updateOrder = async (order: Orders) => {
    const response = await api.put(`/order/update/${order.id}`, order);
    return response.data;
}
export const getOrder = async (id: number) => {
    const response = await api.get(`/order/${id}`);
    return response.data;
}