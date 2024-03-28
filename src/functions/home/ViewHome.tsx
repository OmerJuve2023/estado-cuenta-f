import {Todo} from "./HomeService.ts";
import React, {useState} from "react";
import {
    FaAngleDown,
    FaAngleUp,
    FaCalendar,
    FaClock, FaIdBadge,
    FaListUl,
    FaMoneyBillAlt,
    FaSortNumericUp,
    FaTshirt,
    FaUser
} from "react-icons/fa";
import "../../CSS/CardStyle.css"

interface HomeCardProps {
    home: Todo;
}

const HomeCard: React.FC<HomeCardProps> = ({home}) => {
    const [isOrderVisible, setIsOrderVisible] = useState(false);
    const [isOrderDetailsVisible, setIsOrderDetailsVisible] = useState(false);

    const toggleOrderVisibility = () => {
        setIsOrderVisible(!isOrderVisible);
    };

    const toggleOrderDetailsVisibility = () => {
        setIsOrderDetailsVisible(!isOrderDetailsVisible);
    };

    return (
        <div className="card border-0 mb-4">
            <div className="card-body">
                <div className="customer-info col-3">
                    <FaUser className={"card-icon"}/>
                    <p className="card-text fw-medium">{home.name_customer}</p>
                </div>
                <table className="table">
                    <tbody>
                    {home.orders.map((order) => (
                        <React.Fragment key={order.id}>
                            <tr>
                                <td>
                                    <p className="card-text fw-medium">N° {order.id}</p>
                                </td>
                                <td>
                                    {!isOrderVisible && (
                                        <div>
                                            <p className="card-text">
                                                <FaMoneyBillAlt className={"card-icon"}/>
                                                S/. {order.total_amount}</p>
                                            <p className="card-text ">
                                                <FaClock className={"card-icon"}/>
                                                {order.status}</p>
                                        </div>
                                    )}
                                    {isOrderVisible && (
                                        <div>
                                            <p className="card-text ">
                                                <FaMoneyBillAlt className={"card-icon"}/>
                                                S/. {order.total_amount}</p>
                                            <p className="card-text">
                                                <FaClock className={"card-icon"}/>
                                                {order.status}</p>
                                            <p className={"card-text"}>
                                                <FaCalendar className={"card-icon"}/>
                                                {order.order_date}</p>
                                            {!isOrderDetailsVisible && (
                                                <div className={"ms-5"}>
                                                    <div className={"row"}>
                                                        <div className={"col"}>
                                                            <p className="card-text fw-medium">Detalles de la Orden:</p>
                                                            {order.orderDetails.map((detail) => (
                                                                <div key={detail.id}>
                                                                    <p className="card-text">
                                                                        <FaTshirt className={"card-icon"}/>
                                                                        {detail.name}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className={"col"}>
                                                            {isOrderDetailsVisible ? (
                                                                <FaAngleUp className="expand-icon"
                                                                           onClick={toggleOrderDetailsVisibility}/>
                                                            ) : (
                                                                <FaAngleDown className="expand-icon"
                                                                             onClick={toggleOrderDetailsVisibility}/>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {isOrderDetailsVisible && (
                                                <div className={"ms-5"}>
                                                    <div className={"row"}>
                                                        <div className={"col"}>
                                                            <p className="card-text fw-medium">Detalles de la Orden:</p>
                                                            {order.orderDetails.map((detail) => (
                                                                <div key={detail.id} className={"mb-4"}>
                                                                    <p className={"card-text fw-medium"}>
                                                                        <FaIdBadge className={"card-icon"}/>
                                                                        {detail.id}</p>
                                                                    <div className={"ms-4"}>
                                                                        <p className="card-text">
                                                                            <FaTshirt className={"card-icon"}/>
                                                                            {detail.name}</p>
                                                                        <p className="card-text">
                                                                            <FaSortNumericUp className={"card-icon"}/>
                                                                            {detail.quantity}
                                                                        </p>
                                                                        <p className="card-text">
                                                                            <FaListUl className={"card-icon"}/>
                                                                            S/.{detail.price}
                                                                        </p>
                                                                        <p className="card-text">
                                                                            <FaMoneyBillAlt className={"card-icon"}/>
                                                                            S/. {detail.subtotal}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className={"col-2"}>
                                                            {isOrderDetailsVisible ? (
                                                                <FaAngleUp className="expand-icon"
                                                                           onClick={toggleOrderDetailsVisibility}/>
                                                            ) : (
                                                                <FaAngleDown className="expand-icon"
                                                                             onClick={toggleOrderDetailsVisibility}/>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    )}
                                </td>
                                <td>
                                    {isOrderVisible ? (
                                        <FaAngleUp className="expand-icon" onClick={toggleOrderVisibility}/>
                                    ) : (
                                        <FaAngleDown className="expand-icon" onClick={toggleOrderVisibility}/>
                                    )}
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

interface ViewHomeProps {
    homes: Todo[];
}

const ViewHome: React.FC<ViewHomeProps> = ({homes}) => {
    return (
        <div className="row">
            {homes.map((todo) => (
                <div className="col-lg-12 mb-4" key={todo.id_customer}>
                    <HomeCard
                        key={todo.id_customer}
                        home={todo}
                    />
                </div>
            ))}
        </div>
    );
};

export default ViewHome;