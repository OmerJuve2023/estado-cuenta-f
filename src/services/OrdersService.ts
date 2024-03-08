import {api} from "./apiService.ts";

export interface addOrder {
    [x: string]: string | number | readonly string[] | undefined;

    order_date: string | number | readonly string[] | undefined;
    customer_id: number;
    total_amount: number;
    status: string;
}

export interface updateOrder {
    id: number;
    customer_id: number;
    order_date: string;
    total_amount: number;
    status: string;
}

export const createOrder = async (order: addOrder) => {
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
export const updateOrder = async (order: updateOrder) => {
    const response = await api.put(`/order/update/${order.id}`, order);
    return response.data;
}
export const getOrder = async (id: number) => {
    const response = await api.get(`/order/${id}`);
    return response.data;
}
export const getOrderByAvailable = async () => {
    const response = await api.get('/order/getByavailable');
    return response.data;
}