import {useEffect, useState} from "react";
import {
    createCustomer,
    deleteCustomer,
    listCustomers,
    updateCustomer
} from "../../services/customerService.ts";
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
            console.log("Lista actualizada de clientes:");
            setCustomers(updatedCustomers);
        } catch (error) {
            console.error("Error updating customers:", error);
        }
    };

    return {
        customers: customers,
        loading,
        updateCustomers
    };
}

export const addCustomerS = async (customerData: Customer) => {
    try {
        await createCustomer(customerData);
    } catch (error) {
        console.error("Error al agregar cliente:", error);
        throw error;
    }
};

export const updateCustomerS = async (customer: Customer) => {
    try {
        await updateCustomer(customer);
    } catch (error) {
        console.log("Error al actualizar cliente:" + error);
        throw error;
    }
};

export const deleteCustomerS = async (customerId: number) => {
    try {
        await deleteCustomer(customerId);
    } catch (error) {
        console.log("Error al eliminar cliente:" + error);
        throw error;
    }
};
