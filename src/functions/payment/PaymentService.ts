import {useEffect, useState} from "react";
import {Payment} from "../../classes/Payment.ts";
import {listPayments} from "../../services/paymentService.ts";

export function usePayments() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);
            try {
                const paymentsList = await listPayments();
                setPayments(paymentsList)
            } catch (error) {
                console.error("Error fetching payments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPayments().then(r => console.log(r));
    }, []);
    const updatePayments = async () => {
        try {
            const updatedPayments = await listPayments();
            console.log("Lista actualizada de pagos:", updatedPayments);
            setPayments(updatedPayments);
        } catch (error) {
            console.error("Error updating payments:", error);
        }
    }
    return {payments, loading, updatePayments};
}