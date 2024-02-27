import Modal from "react-modal";
import "../../CSS/AddForm.css";
import React, {useState} from "react";
import {createPayment, addPayment} from "../../services/paymentService.ts";

interface AddPaymentFromProps {
    showModal: boolean;
    handleModalToggle: () => void;
    updatePaymentList: () => void;
}

Modal.setAppElement('#root');

const AddPaymentForm: React.FC<AddPaymentFromProps> = ({showModal, handleModalToggle, updatePaymentList}) => {
    const [newPaymentData, setNewPaymentData] = useState<addPayment>(
        {
            order_id: 0,
            amount: 0
        }
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setNewPaymentData({...newPaymentData, [name]: value});
    };

    const handleCreatePayment = async () => {
        try {
            await createPayment(newPaymentData);
            handleModalToggle();
            updatePaymentList();
            alert("Payment created successfully")
        } catch (error) {
            console.error("Error creating payment:", error);
        }
    };

    return (
        <>
            <Modal
                isOpen={showModal}
                onRequestClose={handleModalToggle}
                contentLabel="Add Payment"
                className="add-modal"
                overlayClassName="modal-overlay"
            >
                <h2 className="modal-title text-center">Add Payment</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="order_id">Order ID</label>
                        <input
                            type="number"
                            className="form-control"
                            id="order_id"
                            name="order_id"
                            value={newPaymentData.order_id}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="payment_date">Payment Date</label>
                        <input
                            type="text"
                            className="form-control"
                            id="payment_date"
                            name="payment_date"
                            value={newPaymentData.amount}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleCreatePayment}
                    >
                        Add Payment
                    </button>
                </form>
            </Modal>
        </>
    );
}

export default AddPaymentForm;