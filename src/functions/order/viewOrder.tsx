import {Orders} from "../../classes/Orders.ts";

export function viewOrder(orders: [Orders]) {
    return (
        <div className="container">
            <h1 className="mb-4">Orders</h1>
            <table className="table table-hover">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">ID Customer</th>
                    <th scope="col">Fecha de Pedido</th>
                    <th scope="col">Total</th>
                    <th scope="col">Estado</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td className="text-primary fw-bold">{order.id}</td>
                        <td className={"text-success fw-bold"}>{order.customer_id}</td>
                        <td>{order.order_date.toString()}</td>
                        <td>{order.total_amount}</td>
                        <td>{order.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}