import {Payment} from "../../classes/Payment.ts";
import "../../CSS/CardStyle.css";
import React from "react";

interface PaymentCardProps {
    payment: Payment;
    onEdit: (payment: Payment) => void;
    onDelete: (paymentId: number) => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({payment, onEdit, onDelete}) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{payment.customer}</h5>
                <p className="card-text">Order ID: {payment.order_id}</p>
                <p className="card-text">Amount: {payment.amount}</p>
                <p className="card-text">Payment Date: {payment.payment_date.toString()}</p>
                <div className="d-flex justify-content-end align-items-center mt-3">
                    <button className="btn transparent-btn me-2" onClick={() => onEdit(payment)}>
                        Editar
                    </button>
                    <button className="btn transparent-btn" onClick={() => onDelete(payment.id)}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
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

/*
const PaymentCard = ({payment}: { payment: Payment }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Payment ID: {payment.id}</h5>
                <p className="card-text">Order ID: {payment.order_id}</p>
                <p className="card-text">Amount: {payment.amount}</p>
                <p className="card-text">Payment Date: {payment.payment_date.toString()}</p>
            </div>
        </div>
    );
};

const viewPayment = (payments: Payment[]) => {
    return (
        <div className="container">
            <div className="row">
                {payments.map(payment => (
                    <div className="col-lg-4 col-md-6 mb-4" key={payment.id}>
                        <PaymentCard payment={payment}/>
                    </div>
                ))}
            </div>
        </div>
    );
};
*/

export default viewPayment;