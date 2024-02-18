import {api} from "./apiService";
import {OrderDetail} from "../classes/OrderDetail.ts";

export const createOrderDetail = async (orderDetail: OrderDetail) => {
    const response = await api.post('/orderDetail/add', orderDetail);
    return response.data;
}
export const listOrderDetails = async () => {
    const response = await api.get('/orderDetail/list');
    console.log(response.data)
    return response.data;
}
export const deleteOrderDetail = async (id: number) => {
    const response = await api.delete(`/orderDetail/delete/${id}`);
    return response.data;
}
export const updateOrderDetail = async (orderDetail: OrderDetail) => {
    const response = await api.put(`/orderDetail/update/${orderDetail.id}`, orderDetail);
    return response.data;
}
export const getOrderDetail = async (id: number) => {
    const response = await api.get(`/orderDetail/${id}`);
    return response.data;
}