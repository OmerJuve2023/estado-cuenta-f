import {Payment} from "../../classes/Payment.ts";
import "../../CSS/CardStyle.css";
import React, {useState} from "react";
import {FaAngleDown, FaAngleUp, FaCalendar, FaEdit, FaMoneyBillAlt, FaReceipt, FaTrash, FaUser} from "react-icons/fa";

interface PaymentCardProps {
    payment: Payment;
    onEdit: (payment: Payment) => void;
    onDelete: (paymentId: number) => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({payment, onEdit, onDelete}) => {
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
                        {payment.customer}
                    </p>
                    <p className="card-text fw-medium">
                        <FaMoneyBillAlt className={"card-icon"}/>
                        S/.{payment.amount}
                    </p>
                    {showDetails && (
                        <div className={`customer-details ${showDetails ? 'show' : 'hide'}`}>
                            <p className="card-text fw-medium">
                                <FaReceipt className={"card-icon"}/>
                                {payment.order_id}
                            </p>
                            <p className="card-text fw-medium">
                                <FaCalendar className={"card-icon"}/>
                                {payment.payment_date.toString()}
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
                        <button className="btn transparent-btn me-2" onClick={() => onEdit(payment)}>
                            <FaEdit/>
                        </button>
                        <button className="btn transparent-btn" onClick={() => onDelete(payment.id)}>
                            <FaTrash/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface ViewPaymentProps {
    payments: Payment[];
    onEdit: (payment: Payment) => void;
    onDelete: (paymentId: number) => void;
}

const viewPayment: React.FC<ViewPaymentProps> = ({payments, onEdit, onDelete}) => {
    return (
        <div className="container">
            <div className="row">
                {payments.map(payment => (
                    <div className="col-lg-4 col-md-6 mb-4" key={payment.id}>
                        <PaymentCard
                            payment={payment}
                            onEdit={() => onEdit(payment)}
                            onDelete={onDelete}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default viewPayment;