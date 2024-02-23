import {useEffect, useState} from "react";
import {listCustomers} from "../../services/customerService.ts";
import Customer from "../../classes/Customer.ts";

export function useCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            try {
                const customersList = await listCustomers();
                setCustomers(customersList);
            } catch (error) {
                console.error("Error fetching customers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers().then(r => console.log(r));
    }, []);

    const updateCustomers = async () => {
        try {
            const updatedCustomers = await listCustomers();
            console.log("Lista actualizada de clientes:", updatedCustomers);
            setCustomers(updatedCustomers);
        } catch (error) {
            console.error("Error updating customers:", error);
        }
    };
    return {orderDetails: customers, loading, updateCustomers};
}