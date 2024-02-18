import {useEffect, useState} from "react";
import {Orders} from "../classes/Orders.ts";
import {listOrders} from "../services/OrdersService.ts";
import {viewOrder} from "../functions/order/viewOrder.tsx";

export function DataViewOrder() {
    const [orders, setOrders] = useState<Orders[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const fetchedOrders = await listOrders();
            setOrders(fetchedOrders);
        };
        fetchData().then(r => console.log(r));
    }, []);
    return (viewOrder(orders as [Orders]))
}
