import {useEffect, useState} from "react";
import {listOrderDetails} from "../services/OrderDetails.ts";
import {viewOrderDetail} from "../functions/orderDetail/viewOrderDetail.tsx";
import {OrderDetail} from "../classes/OrderDetail.ts";

export function DataViewOrderDetail() {
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const fetchedOrders = await listOrderDetails();
            setOrderDetails(fetchedOrders);
        };
        fetchData().then(r => console.log(r));
    }, []);
    return (viewOrderDetail(orderDetails as [OrderDetail]))
}