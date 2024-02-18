import {OrderDetail} from "../../classes/OrderDetail.ts";

export function viewOrderDetail(orderDetails: [OrderDetail]) {
    return (
        <div className="container">
            <h1 className="mb-4">Order Details</h1>
            <table className="table table-hover">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">ID Order</th>
                    <th scope="col">ID Product</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio</th>
                    <th scope="col">SubTotal</th>
                </tr>
                </thead>
                <tbody>
                {orderDetails.map(orderDetail => (
                    <tr key={orderDetail.id}>
                        <td className="text-primary fw-bold">{orderDetail.id}</td>
                        <td className={"text-success fw-bold"}>{orderDetail.order_id}</td>
                        <td className={"text-info fw-bold"}>{orderDetail.product_id}</td>
                        <td>{orderDetail.quantity}</td>
                        <td>{orderDetail.price}</td>
                        <td>{orderDetail.subtotal}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}