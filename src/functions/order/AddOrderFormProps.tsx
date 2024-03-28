import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import "../../CSS/AddForm.css";
import {addOrderS, updateOrderS} from "./OrderService.ts";
import {Orders} from "../../classes/Orders.ts";
import {addOrder} from "../../services/OrdersService.ts";

interface AddOrderFormProps {
    showModal: boolean;
    handleModalToggle: () => void;
    updateOrderList: () => void;
    editingOrder: Orders | null;
}

Modal.setAppElement('#root');

const AddOrderForm: React.FC<AddOrderFormProps> = ({
                                                       showModal,
                                                       handleModalToggle,
                                                       updateOrderList,
                                                       editingOrder
                                                   }) => {
    const orderData = {
        id: 0,
        customer_id: 0,
        order_date: "",
        total_amount:0,
        status: "pending"
    }

    const [newOrderData, setNewOrderData] = useState<addOrder>(orderData);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (editingOrder) {
            setNewOrderData(editingOrder);
            setIsEditing(true);
        } else {
            setNewOrderData(orderData);
            setIsEditing(false);
        }
    }, [editingOrder]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "order_date") {
            // Convertir manualmente la fecha al formato adecuado
            const parts = value.split(/[-T:]/);
            const formattedDate = `${parts[0]}-${parts[1]}-${parts[2]}T${parts[3]}:${parts[4]}`;
            setNewOrderData({ ...newOrderData, [name]: formattedDate });
        } else {
            setNewOrderData({ ...newOrderData, [name]: value });
        }
    };

    const handleSave = async () => {
        try {
            if (isEditing) {
                await updateOrderS(newOrderData);
            } else {
                await addOrderS(newOrderData);
            }
            handleModalToggle();
            updateOrderList();
        } catch (error) {
            console.error("Error creating/updating order:", error);
        }
    }

    const handleCancel = () => {
        setNewOrderData(orderData);
        handleModalToggle();
        setIsEditing(false)
    };

    return (
        <Modal
            isOpen={showModal}
            onRequestClose={handleModalToggle}
            contentLabel={isEditing ? "Editar Orden" : "Agregar Orden"}
            className="add-modal"
            overlayClassName="modal-overlay"
        >
            <h2 className="modal-title text-center">{isEditing ? "Editar Orden" : "Agregar Orden"}</h2>
            <form>
                {!isEditing && (
                    <div className="form-group">
                        <label htmlFor="customer_id">Cliente</label>
                        <input
                            type="number"
                            className="form-control"
                            id="customer_id"
                            name="customer_id"
                            value={newOrderData.customer_id}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
                {isEditing && (
                    <div>
                        <div className="form-group">
                            <label htmlFor="customer_id">Cliente</label>
                            <input
                                type="number"
                                className="form-control"
                                id="customer_id"
                                name="customer_id"
                                value={newOrderData.customer_id}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="order_date">Fecha de Orden</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="order_date"
                                name="order_date"
                                value={newOrderData.order_date}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="total_amount">Total</label>
                            <input
                                type="number"
                                className="form-control"
                                id="total_amount"
                                name="total_amount"
                                value={newOrderData.total_amount}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Estado</label>
                            <input
                                type="text"
                                className="form-control"
                                id="status"
                                name="status"
                                value={newOrderData.status}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                )}
                <div className="d-flex justify-content-center mt-3 button-container">
                    <button
                        style={{
                            border: "none"
                        }}
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSave}
                        id="btn-primary"
                    >
                        {isEditing ? "Editar" : "Crear Orden"}
                    </button>
                    <button
                        style={{
                            border: "none"
                        }}
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancel}
                        id="btn-secondary"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </Modal>
    );

};
export default AddOrderForm;
