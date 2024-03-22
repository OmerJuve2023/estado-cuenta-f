import {api} from "./apiService.ts";

export const getHome = async () => {
    const response = await api.get(`/orderDetail/list`);
    return response.data;
}

