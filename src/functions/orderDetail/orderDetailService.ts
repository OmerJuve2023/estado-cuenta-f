import {useEffect, useState} from "react";
import {OrderDetail} from "../../classes/OrderDetail.ts";
import {listOrderDetails} from "../../services/OrderDetails.ts";

export function useOrderDetail() {
    const [orderDetail, setOrderDetail] = useState<OrderDetail[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchOrderDetail = async () => {
            setLoading(true);
            try {
                const orderDetailList = await listOrderDetails();
                setOrderDetail(orderDetailList);
            } catch (error) {
                console.error("Error fetching order detail:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetail().then(r => console.log(r));
    }, []);

    const updateOrderDetail = async () => {
        try {
            const updatedOrderDetail = await listOrderDetails();
            console.log("Lista actualizada de detalles de pedidos:", updatedOrderDetail);
            setOrderDetail(updatedOrderDetail);
        } catch (error) {
            console.error("Error updating order detail:", error);
        }
    }
    return {orderDetail, loading, updateOrderDetail};
}