import {OrderDetail} from "../../classes/OrderDetail.ts";
import "../../CSS/CardStyle.css";
import React from "react";
import {FaEdit, FaTrash} from "react-icons/fa";

interface OrderDetailCardProps {
    orderDetail: OrderDetail;
    onEdit: (orderDetail: OrderDetail) => void;
    onDelete: (orderDetailId: number) => void;
}

const OrderDetailCard: React.FC<OrderDetailCardProps> = ({orderDetail, onEdit, onDelete}) => {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text"><b>ID:</b><i className={"ms-2"}>{orderDetail.id}</i></p>
                <p className="card-text"><b>Cliente:</b><i className={"ms-2"}>{orderDetail.customer}</i></p>
                <p className="card-text"><b>Producto:</b><i className={"ms-2"}>{orderDetail.product}</i></p>
                <p className="card-text"><b>Cantidad:</b><i className={"ms-2"}>{orderDetail.quantity}</i></p>
                <p className="card-text"><b>Precio:</b><i className={"ms-2"}>{orderDetail.price}</i></p>
                <p className="card-text"><b>SubTotal:</b><i className={"ms-2"}>{orderDetail.subtotal}</i></p>
                <div className="d-flex justify-content-end align-items-center mt-3">
                    <button className="btn transparent-btn me-2" onClick={() => onEdit(orderDetail)}>
                        <FaEdit/> Editar
                    </button>
                    <button className="btn transparent-btn" onClick={() => onDelete(orderDetail.id)}>
                        <FaTrash/> Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

interface ViewOrderDetailProps {
    orderDetails: OrderDetail[];
    onEdit: (orderDetail: OrderDetail) => void;
    onDelete: (orderDetailId: number) => void;
}

const ViewOrderDetail: React.FC<ViewOrderDetailProps> = ({orderDetails, onEdit, onDelete}) => {
    return (
        <div className="container">
            <div className="row">
                {orderDetails.map(orderDetail => (
                    <div className="col-lg-4 col-md-6 mb-4" key={orderDetail.id}>
                        <OrderDetailCard
                            orderDetail={orderDetail}
                            onEdit={() => onEdit(orderDetail)}
                            onDelete={onDelete}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewOrderDetail;
