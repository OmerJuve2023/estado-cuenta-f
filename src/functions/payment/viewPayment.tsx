import {Payment} from "../../classes/Payment.ts";

export function viewPayment(payments: Payment[]) {
    return (
        <div className={"container"}>
            <h1 className={"mb-4"}>Payment</h1>
            <table className="table table-striped">
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