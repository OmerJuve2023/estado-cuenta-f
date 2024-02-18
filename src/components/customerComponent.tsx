import {useEffect, useState} from "react";
import Customer from "../classes/Customer.ts";
import {listCustomers} from "../services/customerService.ts";
import {viewCustomer} from "../functions/customer/viewCustomer.tsx";

export function DataViewCustomer() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const fetchedCustomers = await listCustomers();
            setCustomers(fetchedCustomers);
        };
        fetchData().then(r => console.log(r));
    }, []);

    return (
        viewCustomer(customers as [Customer])
    )
}

