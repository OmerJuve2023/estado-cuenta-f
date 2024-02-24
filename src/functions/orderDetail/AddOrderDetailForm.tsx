import Modal from "react-modal";
import "../../CSS/AddForm.css";
import React, {useState} from "react";
import {addOrderDetail, createOrderDetail} from "../../services/OrderDetails.ts";

interface AddOrderDetailFormProps {
    showModal: boolean;
    handleModalToggle: () => void;
    updateOrderDetailList: () => void;
}

Modal.setAppElement('#root');

const AddOrderDetailForm: React.FC<AddOrderDetailFormProps> = ({
                                                                   showModal,
                                                                   handleModalToggle,
                                                                   updateOrderDetailList
                                                               }) => {
    const initialOrderDetailData = {
        order_id: 0,
        product_id: 0,
        quantity: 0,
        price: 0,
        subtotal: 0
    }

    const [newOrderDetailData, setNewOrderDetailData] = useState<addOrderDetail>(initialOrderDetailData);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setNewOrderDetailData({...newOrderDetailData, [name]: value});
    };

    const handleCreateOrderDetail = async () => {
        try {
            await createOrderDetail(newOrderDetailData);
            handleModalToggle();
            updateOrderDetailList();
            alert("Order Detail created successfully")
        } catch (error) {
            console.error("Error creating order detail:", error);
        }
    };
    const handleCancel = () => {
        // Resetear el estado a los valores iniciales
        setNewOrderDetailData(initialOrderDetailData);
        // Cerrar el modal
        handleModalToggle();
    };

    return (
        <>
            <Modal
                isOpen={showModal}
                onRequestClose={handleModalToggle}
                contentLabel="Add Order Detail"
                className="add-modal"
                overlayClassName="modal-overlay"
            >
                <h2 className="modal-title text-center">Add Order Detail</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="order_id">Order ID</label>
                        <input
                            type="number"
                            className="form-control"
                            id="order_id"
                            name="order_id"
                            value={newOrderDetailData.order_id}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_id">Product ID</label>
                        <input
                            type="number"
                            className="form-control"
                            id="product_id"
                            name="product_id"
                            value={newOrderDetailData.product_id}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            name="quantity"
                            value={newOrderDetailData.quantity}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            value={newOrderDetailData.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subtotal">Subtotal</label>
                        <input
                            type="number"
                            className="form-control"
                            id="subtotal"
                            name="subtotal"
                            value={newOrderDetailData.subtotal}
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
                            onClick={handleCreateOrderDetail}
                            id="btn-primary"
                        >
                            Add Order Detail
                        </button>
                        <button
                            style={{
                                border: "none"
                            }}
                            type="button"
                            className="btn btn-danger"
                            onClick={handleCancel}
                            id={"btn-secondary"}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};
export default AddOrderDetailForm;