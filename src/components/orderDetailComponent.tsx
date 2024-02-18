import React, {useEffect, useState} from "react";
import {listOrderDetails} from "../services/OrderDetails.ts";
import {viewOrderDetail} from "../functions/orderDetail/viewOrderDetail.tsx";
import {OrderDetail} from "../classes/OrderDetail.ts";
import PaginationTable from "./PaginationTable.tsx";

export function DataViewOrderDetail() {
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
    const [loading, setLoading] = useState(false);
    const [filteredOrderDetails, setFilteredOrderDetails] = useState<OrderDetail[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            try {
                const orderDetailsList = await listOrderDetails();
                setOrderDetails(orderDetailsList)
                setFilteredOrderDetails(orderDetailsList)
            } catch (error) {
                console.error("Error fetching order details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails().then(r => console.log(r));
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        filterOrderDetails(event.target.value);
    };

    const filterOrderDetails = (term: string) => {
        const filtered = orderDetails.filter(orderDetail => {
            return orderDetail.id.toString().toLowerCase().includes(term.toLowerCase());
        });
        setFilteredOrderDetails(filtered);
    };

    const currentOrderDetails = filteredOrderDetails.slice(0, 10);

    return (
        loading ? (
            <div>Loading...</div>
        ) : (
            <div className="container">
                <h1 className="mb-4">Order Details</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <PaginationTable<OrderDetail> items={orderDetails} itemsPerPage={4}>
                    {() => (
                        viewOrderDetail(currentOrderDetails as [OrderDetail])
                    )}
                </PaginationTable>
            </div>
        )
    )
}