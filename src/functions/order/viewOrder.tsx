import {Orders} from "../../classes/Orders.ts";
import "../../CSS/CardStyle.css";

const OrderCard = ({order}: { order: Orders }) => {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text"><b>ID:</b><i className={"ms-2"}>{order.id}</i></p>
                <p className="card-text"><b>ID Cliente:</b><i className={"ms-2"}>{order.customer_id}</i></p>
                <p className="card-text"><b>Fecha de Pedido:</b><i className={"ms-2"}>{order.order_date.toString()}</i>
                </p>
                <p className="card-text"><b>Total:</b><i className={"ms-2"}>{order.total_amount}</i></p>
                <p className="card-text"><b>Estado:</b><i className={"ms-2"}>{order.status}</i></p>
            </div>
        </div>
    );
}

const ViewOrder = (orders: [Orders]) => {
    return (
        <div className="container">
            <div className="row">
                {orders.map(order => (
                    <div className="col-lg-4 col-md-6 mb-4" key={order.id}>
                        <OrderCard order={order}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ViewOrder;
