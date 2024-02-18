import React, {useEffect, useState} from "react";
import {Orders} from "../classes/Orders.ts";
import {listOrders} from "../services/OrdersService.ts";
import {viewOrder} from "../functions/order/viewOrder.tsx";
import PaginationTable from "./PaginationTable.tsx";

export function DataViewOrder() {
    const [orders, setOrders] = useState<Orders[]>([]);
    const [loading, setLoading] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState<Orders[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const ordersList = await listOrders();
                setOrders(ordersList)
                setFilteredOrders(ordersList)
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders().then(r => console.log(r));
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        filterOrders(event.target.value);
    };

    const filterOrders = (term: string) => {
        const filtered = orders.filter(order => {
            return order.id.toString().toLowerCase().includes(term.toLowerCase());
        });
        setFilteredOrders(filtered);
    };

    const currentOrders = filteredOrders.slice(0, 10);

    return (
        loading ? (
            <div className={"container"}>Loading...</div>
        ) : (
            <div className="container">
                <h1 className="mb-4">Orders</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <PaginationTable<Orders> items={orders} itemsPerPage={4}>
                    {() => (
                        viewOrder(currentOrders as [Orders])
                    )}
                </PaginationTable>
            </div>
        )
    )
}
