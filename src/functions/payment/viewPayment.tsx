import {Payment} from "../../classes/Payment.ts";
import "../../CSS/CardStyle.css";
import React from "react";
import {FaEdit, FaTrash} from "react-icons/fa";

interface PaymentCardProps {
    payment: Payment;
    onEdit: (payment: Payment) => void;
    onDelete: (paymentId: number) => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({payment, onEdit, onDelete}) => {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-title fw-bold text-center h5" style={{color: "blueviolet"}}>{payment.customer} </p>
                <p className="card-text fw-medium">N° orden: <span className={"ms-2"} style={{color: "blueviolet"}}>
                    {payment.order_id}</span></p>
                <p className="card-text fw-medium">Pagó:<span className={"ms-2"} style={{color: "blueviolet"}}>
                    S/. {payment.amount}</span></p>
                <p className="card-text fw-medium">Fecha de Pago:<span className={"ms-2"} style={{color: "blueviolet"}}>
                        {payment.payment_date.toString()}</span>
                </p>
                <div className="d-flex justify-content-end align-items-center mt-3">
                    <button className="btn transparent-btn me-2" onClick={() => onEdit(payment)}>
                        <FaEdit/> Editar
                    </button>
                    <button className="btn transparent-btn" onClick={() => onDelete(payment.id)}>
                        <FaTrash/> Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
        ;
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