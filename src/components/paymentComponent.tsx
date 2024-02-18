import React, {useEffect, useState} from "react";
import {Payment} from "../classes/Payment.ts";
import {listPayments} from "../services/paymentService.ts";
import {viewPayment} from "../functions/payment/viewPayment.tsx";
import PaginationTable from "./PaginationTable.tsx";

export function DataViewPayment() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(false);
    const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);
            try {
                const paymentsList = await listPayments();
                setPayments(paymentsList)
                setFilteredPayments(paymentsList)
            } catch (error) {
                console.error("Error fetching payments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPayments().then(r => console.log(r));
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        filterPayments(event.target.value);
    }

    const filterPayments = (term: string) => {
        const filtered = payments.filter(payment => {
            return payment.id.toString().toLowerCase().includes(term.toLowerCase());
        });
        setFilteredPayments(filtered);
    }

    const currentPayments = filteredPayments.slice(0, 10);

    return (
        loading ? (
            <div>Loading...</div>
        ) : (
            <div className="container">
                <h1 className="mb-4">Payments</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <PaginationTable<Payment> items={payments} itemsPerPage={4}>
                    {() => (
                        viewPayment(currentPayments as [Payment])
                    )}
                </PaginationTable>
            </div>
        )
    )
}