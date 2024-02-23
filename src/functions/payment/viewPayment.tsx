import {Payment} from "../../classes/Payment.ts";
import "../../CSS/TableStyle.css";
export function viewPayment(payments: Payment[]) {
    return (
        <div className={"table-responsive"}>
            <table className="table table-hover table-custom">
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
}