import {useEffect, useState} from "react";
import {Payment} from "../classes/Payment.ts";
import {listPayments} from "../services/paymentService.ts";
import {viewPayment} from "../functions/payment/viewPayment.tsx";

export function DataViewPayment() {
    const [payments, setPayments] = useState<Payment[]>([]);
    useEffect(() => {
            const fetchData = async () => {
                const fetchedPayments = await listPayments();
                setPayments(fetchedPayments);
            };
            fetchData().then(r => console.log(r));
        }
        , []);
    return (viewPayment(payments as [Payment]))
}