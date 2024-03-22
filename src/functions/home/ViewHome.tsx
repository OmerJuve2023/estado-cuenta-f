import {Todo} from "./HomeService.ts";
import React, {useState} from "react";

interface HomeCardProps {
    home: Todo;
    onEdit: (home: Todo) => void;
    onDelete: (homeId: number) => void;
}

const HomeCard: React.FC<HomeCardProps> = ({home, onEdit, onDelete}) => {
    const [isOrderVisible, setIsOrderVisible] = useState(false);
    const [isOrderDetailsVisible, setIsOrderDetailsVisible] = useState(false);

    const toggleOrderVisibility = () => {
        setIsOrderVisible(!isOrderVisible);
    };

    const toggleOrderDetailsVisibility = () => {
        setIsOrderDetailsVisible(!isOrderDetailsVisible);
    };

    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text fw-bold h5 text-center">
                    <span style={{color: "blueviolet"}}>{home.name_customer}</span>
                </p>
                {home.orders.map((order) => (
                    <div key={order.id}>
                        <button className="btn" onClick={toggleOrderVisibility}>
                            {isOrderVisible ? "Ocultar" : "Mostrar"}
                        </button>
                        {!isOrderVisible && (
                            <div>
                                <p className="card-text fw-medium">S/. {order.total_amount}</p>
                                <p className="card-text fw-medium">{order.status}</p>
                            </div>
                        )}
                        {isOrderVisible && (
                            <div>
                                <p className="card-text fw-medium">Fecha {order.order_date}</p>
                                <p className="card-text fw-medium">Total: S/. {order.total_amount}</p>
                                <p className="card-text fw-medium">Estado: {order.status}</p>
                                <button className="btn" onClick={toggleOrderDetailsVisibility}>
                                    {isOrderDetailsVisible ? "Ocultar Detalles " : "Mostrar Detalles "}
                                </button>
                                <div>
                                    <p className="card-text fw-medium">Detalles de la Orden:</p>
                                    {order.orderDetails.map((detail) => (
                                        <div key={detail.id}>
                                            {!isOrderDetailsVisible && (
                                                <div>

                                                </div>
                                            )}
                                            {isOrderDetailsVisible && (
                                                <div>
                                                    <p className="card-text">Nombre del Producto: {detail.name}</p>
                                                    <p className="card-text">Subtotal: S/. {detail.subtotal}</p>
                                                </div>
                                            )}

                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


interface ViewHomeProps {
    homes: Todo[];
    onEdit: (home: Todo) => void;
    onDelete: (homeId: number) => void;
}

const ViewHome: React.FC<ViewHomeProps> = ({homes, onEdit, onDelete}) => {
    return (
        <div className="container">
            <div className="row">
                {homes.map((todo) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={todo.id_customer}>
                        <HomeCard
                            key={todo.id_customer}
                            home={todo}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewHome;
