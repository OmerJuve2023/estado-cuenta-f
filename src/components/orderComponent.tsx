import {useState} from "react";
import {Orders} from "../classes/Orders.ts";
import PaginationTable from "./PaginationTable.tsx";
import "../CSS/ComponentStyle.css";
import {FaUserPlus} from "react-icons/fa";
import {useUI} from "../functions/FilterCustomer.ts";
import AddOrderForm from "../functions/order/AddOrderFormProps.tsx";
import {deleteOrderS, useOrders} from "../functions/order/OrderService.ts";
import ViewOrder from "../functions/order/viewOrder.tsx";

export function DataViewOrder() {
    const {orders, updateOrders} = useOrders();
    const {searchTerm, handleSearch, showModal, handleModalToggle} = useUI();
    const [editingOrder, setEditingOrder] = useState<Orders | null>(null); // Nuevo estado para datos del cliente en edición
    const filteredOrders = orders.filter(orders => {
        return orders.name.toString().toLowerCase().includes(searchTerm);
    });
    const handleEdit = (order: Orders) => {
        setEditingOrder(order);
        handleModalToggle(); // Abre el modal de edición
    }
    const handleModalClose = () => {
        setEditingOrder(null); // Limpiar la orden en edición cuando se cierre el modal
        handleModalToggle();
    }
    const handleDelete = async (orderId: number) => {
        await deleteOrderS(orderId);
        const updatedOrders = await updateOrders();
        alert("Orden eliminada")
        console.log("Lista actualizada de ordenes:", updatedOrders);
    };

    return (
        <div className="container">
            <h1 className="mb-4 mt-5 text-center clientes-title display-4 display-md-3">Gestión de Ordenes</h1>
            <div className="mb-4 row align-items-center">
                <div className="col-sm-8 col-md-6">
                    <div className="input-group search-bar">
                        <input
                            style={{
                                boxShadow: "none",
                            }}
                            type="search"
                            className="form-control search-input"
                            placeholder="Buscar por id o nombre"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className="col-sm-4 col-md-6 mt-3 mt-sm-0">
                    <div className="d-grid">
                        <button className="btn btn-custom btn-block" onClick={handleModalToggle}>
                            <FaUserPlus className="me-1"/>
                            Agregar Orden
                        </button>
                    </div>
                </div>
            </div>
            <PaginationTable<Orders> items={filteredOrders} itemsPerPage={10}>
                {(items: Orders[]) => (
                    <ViewOrder orders={items} onEdit={handleEdit} onDelete={handleDelete}/>
                )}
            </PaginationTable>
            <AddOrderForm
                showModal={showModal}
                handleModalToggle={handleModalClose}
                updateOrderList={updateOrders}
                editingOrder={editingOrder}
            ></AddOrderForm>
        </div>
    )
}
