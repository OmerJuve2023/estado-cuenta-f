import {Orders} from "../../classes/Orders.ts";
import "../../CSS/CardStyle.css";
import React from "react";
import {FaEdit, FaTrash} from "react-icons/fa";

interface OrderCardProps {
    order: Orders;
    onEdit: (order: Orders) => void;
    onDelete: (orderId: number) => void;

}

const OrderCard: React.FC<OrderCardProps> = ({order, onEdit, onDelete}) => {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text fw-medium"><b>Cliente:</b><span className={"ms-2"}
                                                                        style={{color: "blueviolet"}}>
                    {order.name}</span></p>
                <p className="card-text fw-medium"><b>N° orden:</b><span className={"ms-2"}
                                                                         style={{color: "blueviolet"}}>
                    {order.id}</span></p>
                <p className="card-text fw-medium"><b>Fecha de Pedido:</b><span
                    className={"ms-2"} style={{color: "blueviolet"}}>
                    {order.order_date.toString()}</span>
                </p>
                <p className="card-text fw-medium"><b>Total:</b><span className={"ms-2"} style={{color: "blueviolet"}}>
                   S/. {order.total_amount}</span></p>
                <p className="card-text fw-medium"><b>Estado:</b><span className={"ms-2"} style={{color: "blueviolet"}}>
                    {order.status}</span></p>
                <div className="d-flex justify-content-end align-items-center mt-3">
                    <button className="btn transparent-btn me-2" onClick={() => onEdit(order)}>
                        <FaEdit/> Editar
                    </button>
                    <button className="btn transparent-btn" onClick={() => onDelete(order.id)}>
                        <FaTrash/> Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

interface ViewOrderProps {
    orders: Orders[];
    onEdit: (order: Orders) => void;
    onDelete: (orderId: number) => void;
}

const ViewOrder: React.FC<ViewOrderProps> = ({orders, onEdit, onDelete}) => {
    return (
        <div className="container">
            <div className="row">
                {orders.map(order => (
                    <div className="col-lg-4 col-md-6 mb-4" key={order.id}>
                        <OrderCard
                            order={order}
                            onEdit={() => onEdit(order)}
                            onDelete={onDelete}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewOrder;