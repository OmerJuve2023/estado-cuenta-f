import {Payment} from "../../classes/Payment.ts";
import "../../CSS/CardStyle.css";

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

export default viewPayment;