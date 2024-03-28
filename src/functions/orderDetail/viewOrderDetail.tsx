import {OrderDetail} from "../../classes/OrderDetail.ts";
import "../../CSS/CardStyle.css";
import React, {useState} from "react";
import {
    FaAngleDown,
    FaAngleUp,
    FaEdit,
    FaListUl,
    FaMoneyBillAlt,
    FaReceipt,
    FaSortNumericUp,
    FaTrash,
    FaTshirt,
    FaUser
} from "react-icons/fa";

interface OrderDetailCardProps {
    orderDetail: OrderDetail;
    onEdit: (orderDetail: OrderDetail) => void;
    onDelete: (orderDetailId: number) => void;
}

const OrderDetailCard: React.FC<OrderDetailCardProps> = ({orderDetail, onEdit, onDelete}) => {
    const [showDetails, setShowDetails] = useState(false);
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    return (
        <div className="card border-0">
            <div className="card-body">
                <div className={"customer-info col-auto"}>
                    <p className="card-text fw-medium">
                        <FaUser className={"card-icon"}/>
                        {orderDetail.customer}
                    </p>
                    <p className="card-text fw-medium">
                        <FaMoneyBillAlt className={"card-icon"}/>
                        S/.{orderDetail.subtotal}</p>
                    {showDetails && (
                        <div className={`customer-details ${showDetails ? 'show' : 'hide'}`}>
                            <p className="card-text fw-medium">
                                <FaReceipt className={"card-icon"}/>
                                {orderDetail.id}
                            </p>
                            <p className="card-text fw-medium">
                                <FaTshirt className={"card-icon"}/>
                                {orderDetail.product}
                            </p>
                            <p className="card-text fw-medium">
                                <FaSortNumericUp className={"card-icon"}/>
                                S/.{orderDetail.quantity}
                            </p>
                            <p className="card-text fw-medium">
                                <FaListUl className={"card-icon"}/>
                                S/.{orderDetail.price}
                            </p>
                        </div>
                    )}
                </div>
                <div className={"mt-auto"}>
                    <div className="action-buttons d-flex justify-content-center">
                        {showDetails ? (
                            <FaAngleUp className="expand-icon" onClick={toggleDetails}/>
                        ) : (
                            <FaAngleDown className="expand-icon" onClick={toggleDetails}/>
                        )}
                        <button className="btn transparent-btn me-2" onClick={() => onEdit(orderDetail)}>
                            <FaEdit/>
                        </button>
                        <button className="btn transparent-btn" onClick={() => onDelete(orderDetail.id)}>
                            <FaTrash/>
                        </button>
                    </div>
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
