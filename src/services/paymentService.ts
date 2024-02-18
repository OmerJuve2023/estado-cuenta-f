import {api} from "./apiService";
import {Payment} from "../classes/Payment";

export const createPayment = async (payment: Payment) => {
    const response = await api.post('/payment/add', payment);
    return response.data;
}
export const listPayments = async () => {
    const response = await api.get('/payment/list');
    console.log(response.data)
    return response.data;
}
export const deletePayment = async (id: number) => {
    const response = await api.delete(`/payment/delete/${id}`);
    return response.data;
}
export const updatePayment = async (payment: Payment) => {
    const response = await api.put(`/payment/update/${payment.id}`, payment);
    return response.data;
}
export const getPayment = async (id: number) => {
    const response = await api.get(`/payment/${id}`);
    return response.data;
}