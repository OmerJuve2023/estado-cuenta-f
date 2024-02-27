import {OrderDetail} from "../classes/OrderDetail.ts";
import PaginationTable from "./PaginationTable.tsx";
import {useUI} from "../functions/FilterCustomer.ts";
import {useOrderDetail} from "../functions/orderDetail/orderDetailService.ts";
import "../CSS/ComponentStyle.css";
import React from "react";
import AddOrderDetailForm from "../functions/orderDetail/AddOrderDetailForm.tsx";
import {FaUserPlus} from "react-icons/fa";
import viewOrderDetail from "../functions/orderDetail/viewOrderDetail.tsx";

export function DataViewOrderDetail() {

    const {orderDetail, updateOrderDetail} = useOrderDetail();
    const {searchTerm, handleSearch, showModal, handleModalToggle} = useUI();
    const filteredOrderDetails = orderDetail.filter(orderDetail => {
        return orderDetail.id.toString().toLowerCase().includes(searchTerm);
    });

    return (
        <div className="container">
            <h1 className="mb-4 mt-5 text-center clientes-title display-4 display-md-3">Detalles de Ordenes</h1>
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
            <PaginationTable<OrderDetail> items={filteredOrderDetails} itemsPerPage={4}>
                {viewOrderDetail as (items: OrderDetail[]) => React.ReactNode}
            </PaginationTable>
            <AddOrderDetailForm
                showModal={showModal}
                handleModalToggle={handleModalToggle}
                updateOrderDetailList={updateOrderDetail}
            />
        </div>
    )
}