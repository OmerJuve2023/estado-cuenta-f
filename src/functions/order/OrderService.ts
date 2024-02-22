import {useEffect, useState} from "react";
import {Orders} from "../../classes/Orders.ts";
import {listOrders} from "../../services/OrdersService.ts";

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