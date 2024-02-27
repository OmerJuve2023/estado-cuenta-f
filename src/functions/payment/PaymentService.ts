import {useEffect, useState} from "react";
import {Payment} from "../../classes/Payment.ts";
import {addPayment, createPayment, deletePayment, listPayments, updatePayment} from "../../services/paymentService.ts";

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

export const addPaymentS = async (payment: addPayment) => {
    try {
        await createPayment(payment);
    } catch (error) {
        console.error("Error al agregar pago:", error);
        throw error;
    }
}
export const updatePaymentS = async (payment: Payment) => {
    try {
        await updatePayment(payment);
    } catch (error) {
        console.error("Error al actualizar pago:", error);
        throw error;
    }
}
export const deletePaymentS = async (paymentId: number) => {
    try {
        await deletePayment(paymentId);
    } catch (error) {
        console.error("Error al eliminar pago:", error);
        throw error;
    }
}
