import React from "react";
import {Payment} from "../classes/Payment.ts";
import PaginationTable from "./PaginationTable.tsx";
import {useUI} from "../functions/FilterCustomer.ts";
import {FaUserPlus} from "react-icons/fa";
import AddPaymentForm from "../functions/payment/AddPayment.tsx";
import "../CSS/ComponentStyle.css";
import {usePayments} from "../functions/payment/PaymentService.ts";
import viewPayment from "../functions/payment/viewPayment.tsx";

export function DataViewPayment() {
    const {payments, updatePayments} = usePayments();
    const {searchTerm, handleSearch, showModal, handleModalToggle} = useUI();
    const filteredPayments = payments.filter(customer => {
        return customer.id.toString().includes(searchTerm.toLowerCase());
    });
    return (
        <div className="container">
            <h1 className="mb-4 mt-5 text-center clientes-title display-4 display-md-3">Gestión de Pagos</h1>
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
            <PaginationTable<Payment> items={filteredPayments} itemsPerPage={4}>
                {viewPayment as (items: Payment[]) => React.ReactNode}
            </PaginationTable>
            <AddPaymentForm
                showModal={showModal}
                handleModalToggle={handleModalToggle}
                updatePaymentList={updatePayments}
            />
        </div>
    )
}