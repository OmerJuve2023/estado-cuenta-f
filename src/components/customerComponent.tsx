import React, {useEffect, useState} from "react";
import Customer from "../classes/Customer.ts";
import {listCustomers} from "../services/customerService.ts";
import viewCustomer from "../functions/customer/viewCustomer.tsx";
import PaginationTable from "../components/PaginationTable.tsx";

export function DataViewCustomer() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);
    const [filteredProducts, setFilteredCustomer] = useState<Customer[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            try {
                const customersList = await listCustomers();
                setCustomers(customersList)
                setFilteredCustomer(customersList)
            } catch (error) {
                console.error("Error fetching customers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers().then(r => console.log(r));
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        filterCustomers(event.target.value);
    };

    const filterCustomers = (term: string) => {
        const filtered = customers.filter(customer => {
            return customer.name.toLowerCase().includes(term.toLowerCase());
        });
        setFilteredCustomer(filtered);
    };
    const currentCustomers = filteredProducts.slice(0, 10);

    return (
        loading ? (
            <div>Loading...</div>
        ) : (

            <div className="container">
                <h1 className="mb-4">Clientes</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <PaginationTable<Customer> items={customers} itemsPerPage={10}>
                    {() => (
                        viewCustomer(currentCustomers as [Customer])
                    )}
                </PaginationTable>
            </div>
        )
    )
}