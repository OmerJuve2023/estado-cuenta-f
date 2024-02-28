import {deleteCustomerS, useCustomers} from "../functions/customer/CustomerService.ts";
import {useState} from "react";
import Customer from "../classes/Customer.ts";
import {useUI} from "../functions/FilterCustomer.ts";
import {FaUserPlus} from "react-icons/fa";
import ViewCustomer from "../functions/customer/ViewCustomer.tsx";
import AddCustomerForm from "../functions/customer/AddCustomerForm.tsx";
import PaginationTable from "../components/PaginationTable.tsx";

export function DataViewCustomer() {

    const {customers, updateCustomers} = useCustomers();
    const {searchTerm, handleSearch, showModal, handleModalToggle} = useUI();
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null); // Nuevo estado para datos del cliente en edición
    const filteredCustomers = customers.filter(customer => {
        return customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    // Método para manejar la edición del cliente
    const handleEdit = (customer: Customer) => {
        setEditingCustomer(customer);
        handleModalToggle(); // Abre el modal de edición
    };

    const handleModalClose = () => {
        setEditingCustomer(null); // Limpiar el cliente en edición cuando se cierre el modal
        handleModalToggle();
    };
    const handleDelete = async (customerId: number) => {
        await deleteCustomerS(customerId);
        await updateCustomers();
        alert("Cliente eliminado")
    };

    return (
        <div className="container">
            <h1 className="mb-4 mt-5 text-center clientes-title display-4 display-md-3">Gestión de Clientes</h1>
            <div className="mb-4 row align-items-center">
                <div className="col-sm-8 col-md-6">
                    <div className="input-group search-bar">
                        <input
                            style={{
                                boxShadow: "none",
                            }}
                            type="search"
                            className="form-control search-input"
                            placeholder="Buscar por nombre"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className="col-sm-4 col-md-6 mt-3 mt-sm-0">
                    <div className="d-grid">
                        <button className="btn btn-custom btn-block" onClick={handleModalToggle}>
                            <FaUserPlus className="me-1"/>
                            Agregar Cliente
                        </button>
                    </div>
                </div>
            </div>
            <PaginationTable<Customer> items={filteredCustomers} itemsPerPage={10}>
                {(items: Customer[]) => (
                    <ViewCustomer customers={items} onEdit={handleEdit} onDelete={handleDelete}/>
                )}
            </PaginationTable>
            <AddCustomerForm
                showModal={showModal}
                handleModalToggle={handleModalClose}
                updateCustomerList={updateCustomers}
                editingCustomer={editingCustomer} // Pasar los datos del cliente en edición al modal
            />
        </div>
    );
}
