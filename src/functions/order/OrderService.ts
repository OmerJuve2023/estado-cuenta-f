import {useEffect, useState} from "react";
import {Orders} from "../../classes/Orders.ts";
import {addOrder, createOrder, deleteOrder, listOrders, updateOrder} from "../../services/OrdersService.ts";

export function useOrders() {
    const [orders, setOrders] = useState<Orders[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const ordersList = await listOrders();
                setOrders(ordersList)
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders().then(r => console.log(r));
    }, []);
    const updateOrders = async () => {
        try {
            const updatedOrders = await listOrders();
            console.log("Lista actualizada de pedidos:", updatedOrders);
            setOrders(updatedOrders);
        } catch (error) {
            console.error("Error updating orders:", error);
        }
    }
    return {orders, loading, updateOrders};
}

export const addOrderS = async (order: addOrder) => {
    try {
        await createOrder(order);
    } catch (error) {
        console.error("Error al agregar pedido:", error);
        throw error;
    }
}
export const updateOrderS = async (order: Orders) => {
    try {
        await updateOrder(order);
    } catch (error) {
        console.error("Error al actualizar pedido:", error);
        throw error;
    }
}
export const deleteOrderS = async (orderId: number) => {
    try {
        await deleteOrder(orderId);
    } catch (error) {
        console.error("Error al eliminar pedido:", error);
        throw error;
    }
}