import {Orders} from "../../classes/Orders.ts";
import "../../CSS/CardStyle.css";
import React, {useState} from "react";
import {
    FaAngleDown,
    FaAngleUp, FaCalendar, FaClock,
    FaEdit,
    FaMoneyCheck,
    FaReceipt,
    FaTrash,
    FaUser
} from "react-icons/fa";

interface OrderCardProps {
    order: Orders;
    onEdit: (order: Orders) => void;
    onDelete: (orderId: number) => void;

}

const OrderCard: React.FC<OrderCardProps> = ({order, onEdit, onDelete}) => {
    const [showDetails, setShowDetails] = useState(false);
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    return (
        <div className="card border-0">
            <div className="card-body">
                <div className={"customer-info col-auto"}>
                    <p className={"card-text fw-medium"}><FaUser className={"card-icon"}/>{order.name}</p>
                    <p className="card-text fw-medium"><FaMoneyCheck className={"card-icon"}/>S/.{order.total_amount}
                    </p>
                    {showDetails && (
                        <div className={`customer-details ${showDetails ? 'show' : 'hide'}`}>
                            <p className="card-text fw-medium">
                                <FaReceipt className={"card-icon"}/>
                                {order.id}</p>
                            <p className="card-text fw-medium">
                                <FaCalendar className={"card-icon"}/>
                                {order.order_date.toString()}
                            </p>
                            <p className="card-text fw-medium">
                                <FaClock className={"card-icon"}/>
                                {order.status}</p>
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
                        <button className="btn transparent-btn me-2" onClick={() => onEdit(order)}>
                            <FaEdit/>
                        </button>
                        <button className="btn transparent-btn" onClick={() => onDelete(order.id)}>
                            <FaTrash/>
                        </button>
                    </div>
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