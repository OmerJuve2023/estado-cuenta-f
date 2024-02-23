import Modal from "react-modal";
import "../../CSS/AddForm.css";
import {addOrder, createOrder} from "../../services/OrdersService.ts";
import React, {useState} from "react";

interface AddOrderFormProps {
    showModal: boolean;
    handleModalToggle: () => void;
    updateOrderList: () => void;
}

Modal.setAppElement('#root');

const AddOrderForm: React.FC<AddOrderFormProps> = ({showModal, handleModalToggle, updateOrderList}) => {
    const [newOrderData, setNewOrderData] = useState<addOrder>(
        {
            customer_id: 0,
            quantity: 0,
            status: "pending"
        }
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setNewOrderData({...newOrderData, [name]: value});
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
                        <label htmlFor="total_amount">Total Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="total_amount"
                            name="total_amount"
                            value={newOrderData.quantity}
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