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
                <p className="card-text"><b>ID:</b><i className={"ms-2"}>{order.id}</i></p>
                <p className="card-text"><b>ID Cliente:</b><i className={"ms-2"}>{order.customer_id}</i></p>
                <p className="card-text"><b>Fecha de Pedido:</b><i className={"ms-2"}>{order.order_date.toString()}</i>
                </p>
                <p className="card-text"><b>Total:</b><i className={"ms-2"}>{order.total_amount}</i></p>
                <p className="card-text"><b>Estado:</b><i className={"ms-2"}>{order.status}</i></p>
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
