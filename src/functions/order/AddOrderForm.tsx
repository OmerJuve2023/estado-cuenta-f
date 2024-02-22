import Modal from "react-modal";
import "../../CSS/AddForm.css";
import {createOrder} from "../../services/OrdersService.ts";
import React, {useState} from "react";
import {Orders} from "../../classes/Orders.ts";

interface AddOrderForm {
    showModal: boolean;
    handleModalToggle: () => void;
    updateOrderList: () => void;
}

Modal.setAppElement('#root');

const AddOrderForm: React.FC<AddOrderForm> = ({showModal, handleModalToggle, updateOrderList}) => {
    const [newOrderData, setNewOrderData] = useState<Orders>({
        id: 0,
        customer_id: 0,
        order_date: new Date(),
        total_amount: 0,
        status: "pending",
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        if (name === 'order_date') {
            // Convertir el valor de la entrada en un objeto Date
            const dateValue = new Date(value);
            setNewOrderData({...newOrderData, [name]: dateValue});
        } else {
            setNewOrderData({...newOrderData, [name]: value});
        }
    };

    const handleCreateOrder = async () => {
        try {
            await createOrder(newOrderData);
            handleModalToggle();
            updateOrderList();
            alert("Order created successfully")
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };


    return (
        <>
            <Modal
                isOpen={showModal}
                onRequestClose={handleModalToggle}
                contentLabel="Add Order"
                className="add-modal"
                overlayClassName="modal-overlay"
            >
                <h2 className="modal-title text-center">Add Order</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="customer_id">Customer ID</label>
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
                        <label htmlFor="order_date">Order Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="order_date"
                            name="order_date"
                            value={newOrderData.order_date.toISOString().split('T')[0]}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="total_amount">Total Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="total_amount"
                            name="total_amount"
                            value={newOrderData.total_amount}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="d-flex justify-content-center mt-3 button-container">
                        <button
                            style={{
                                border: "none"
                            }}
                            type="button"
                            className="btn btn-primary"
                            onClick={handleCreateOrder}
                            id="btn-primary"
                        >
                            Crear Orden
                        </button>
                        <button
                            style={{
                                border: "none"
                            }}
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleModalToggle}
                            id="btn-secondary"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};
export default AddOrderForm;