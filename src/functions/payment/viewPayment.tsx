/*
import {Payment} from "../../classes/Payment.ts";
import "../../CSS/CardStyle.css";
export function viewPayment(payments: Payment[]) {
    return (
        <div className={"table-responsive"}>
            <table className="table table-hover table-custom table-striped">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Order ID</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Payment Date</th>
                </tr>
                </thead>
                <tbody>
                {payments.map(payment => (
                    <tr key={payment.id}>
                        <td className={"text-primary fw-bold"}>{payment.id}</td>
                        <td className={"text-success fw-bold"}>{payment.order_id}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.payment_date.toString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}*/
import { Payment } from "../../classes/Payment.ts";
import "../../CSS/CardStyle.css";

const PaymentCard = ({ payment }: { payment: Payment }) => {
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

export function viewPayment(payments: Payment[]) {
    return (
        <div className="container">
            <div className="row">
                {payments.map(payment => (
                    <div className="col-lg-4 col-md-6 mb-4" key={payment.id}>
                        <PaymentCard payment={payment} />
                    </div>
                ))}
            </div>
        </div>
    );
}
