import Customer from "../classes/Customer.ts";
import PaginationTable from "../components/PaginationTable.tsx";
import AddCustomerForm from "../functions/customer/AddCustomerForm.tsx";
import ViewCustomer from "../functions/customer/ViewCustomer.tsx";
import {deleteCustomerS, updateCustomerS, useCustomers} from "../functions/customer/CustomerService.ts";
import {useUI} from "../functions/FilterCustomer.ts";
import {FaUserPlus} from 'react-icons/fa';
import "../CSS/ComponentStyle.css";


export function DataViewCustomer() {
    const {customers, updateCustomers} = useCustomers();
    const {searchTerm, handleSearch, showModal, handleModalToggle} = useUI();
    const filteredCustomers = customers.filter(customer => {
        return customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleDelete = async (customerId: number) => {
        await deleteCustomerS(customerId);
        const updatedCustomers = await updateCustomers();
        console.log("Lista actualizada de clientes:", updatedCustomers);
    };

    const handleEdit = async (customer: Customer) => {
        await updateCustomerS(customer);
        const updatedCustomers = await updateCustomers();
        console.log("Lista actualizada de clientes:", updatedCustomers);
    };

    return (
        <div className="container">
            <h1 className="mb-4 mt-5 text-center clientes-title display-4 display-md-3">Gestión de Clientes</h1>
            <div className="mb-4 row align-items-center"> {/* Contenedor para el campo de búsqueda y el botón */}
                <div className="col-sm-8 col-md-6"> {/* Columna para el campo de búsqueda */}
                    <div className="input-group search-bar">
                        <input
                            style={{
                                boxShadow: "none",
                            }}
                            type="search"
                            className="form-control search-input" // Aplicamos la clase personalizada al campo de búsqueda
                            placeholder="Buscar por nombre"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className="col-sm-4 col-md-6 mt-3 mt-sm-0"> {/* Columna para el botón */}
                    <div className="d-grid"> {/* Utilizamos una cuadrícula (grid) */}
                        <button className="btn btn-custom btn-block"
                                onClick={handleModalToggle}> {/* Aplicamos la clase personalizada al botón y lo hacemos ocupar toda la fila */}
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
                handleModalToggle={handleModalToggle}
                updateCustomerList={updateCustomers}
            />
        </div>
    );
}