import React from "react";
import {Orders} from "../classes/Orders.ts";
import {viewOrder} from "../functions/order/viewOrder.tsx";
import PaginationTable from "./PaginationTable.tsx";
import "../CSS/CustomerStyle.css";
import {FaUserPlus} from "react-icons/fa";
import {useUI} from "../functions/customer/FilterCustomer.ts";
import AddOrderForm from "../functions/order/AddOrderFormProps.tsx";
import {useOrders} from "../functions/order/OrderService.ts";

export function DataViewOrder() {
    const {orders, updateOrders} = useOrders();
    const {searchTerm, handleSearch, showModal, handleModalToggle} = useUI();
    const filteredCustomers = orders.filter(orders => {
        return orders.id.toString().toLowerCase().includes(searchTerm);
    });
    return (
        <>
            <div className="container">
                <h1 className="mb-4 mt-5 text-center clientes-title display-4 display-md-3">Gestión de Ordenes</h1>
                <div className="mb-4 row align-items-center"> {/* Contenedor para el campo de búsqueda y el botón */}
                    <div className="col-sm-8 col-md-6"> {/* Columna para el campo de búsqueda */}
                        <div className="input-group search-bar">
                            <input
                                style={{
                                    boxShadow: "none",
                                }}
                                type="search"
                                className="form-control search-input" // Aplicamos la clase personalizada al campo de búsqueda
                                placeholder="Buscar por id o nombre"
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
                                Agregar Orden
                            </button>
                        </div>
                    </div>
                </div>
                <PaginationTable<Orders> items={filteredCustomers} itemsPerPage={10}>
                    {viewOrder as (items: Orders[]) => React.ReactNode}
                </PaginationTable>
                <AddOrderForm
                    showModal={showModal}
                    handleModalToggle={handleModalToggle}
                    updateOrderList={updateOrders}
                ></AddOrderForm>
            </div>
        </>
    )
}
