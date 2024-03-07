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
                <p className="card-text fw-medium">ID:<span className={"ms-2"} style={{color: "blueviolet"}}>
                    {orderDetail.id}</span></p>
                <p className="card-text fw-medium">Cliente:<span className={"ms-2"}
                                                                        style={{color: "blueviolet"}}>
                    {orderDetail.customer}</span>
                </p>
                <p className="card-text fw-medium">Producto:<span className={"ms-2"}
                                                                         style={{color: "blueviolet"}}>
                    {orderDetail.product}</span>
                </p>
                <p className="card-text fw-medium">Cantidad:<span className={"ms-2"}
                                                                         style={{color: "blueviolet"}}>
                    {orderDetail.quantity}</span>
                </p>
                <p className="card-text fw-medium">Precio:<span className={"ms-2"} style={{color: "blueviolet"}}>
                    S/.{orderDetail.price}</span></p>
                <p className="card-text fw-medium">SubTotal:<span className={"ms-2"}
                                                                         style={{color: "blueviolet"}}>
                    S/.{orderDetail.subtotal}</span></p>
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
