import {OrderDetail} from "../../classes/OrderDetail.ts";
import "../../CSS/CardStyle.css";

const OrderDetailCard = ({orderDetail}: { orderDetail: OrderDetail }) => {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text"><b>ID Pedido:</b><i className={"ms-2"}>{orderDetail.order_id}</i></p>
                <p className="card-text"><b>ID Producto:</b><i className={"ms-2"}>{orderDetail.product_id}</i></p>
                <p className="card-text"><b>Cantidad:</b><i className={"ms-2"}>{orderDetail.quantity}</i></p>
                <p className="card-text"><b>Precio:</b><i className={"ms-2"}>{orderDetail.price}</i></p>
                <p className="card-text"><b>SubTotal:</b><i className={"ms-2"}>{orderDetail.subtotal}</i></p>
            </div>
        </div>
    );
}
const ViewOrderDetail = (orderDetails: [OrderDetail]) => {
    return (
        <div className="container">
            <div className="row">
                {orderDetails.map(orderDetail => (
                    <div className="col-lg-4 col-md-6 mb-4" key={orderDetail.id}>
                        <OrderDetailCard orderDetail={orderDetail}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewOrderDetail;
