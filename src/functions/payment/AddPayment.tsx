import Modal from "react-modal";
import "../../CSS/AddForm.css";
import React, {useEffect, useState} from "react";
import {Payment} from "../../classes/Payment.ts";
import {addPaymentS, updatePaymentS} from "./PaymentService.ts";
import {getOrderByAvailableS} from "../order/OrderService.ts";

interface AddPaymentFromProps {
    showModal: boolean;
    handleModalToggle: () => void;
    updatePaymentList: () => void;
    editingPayment: Payment | null;
}

Modal.setAppElement('#root');

const AddPaymentForm: React.FC<AddPaymentFromProps> = ({
                                                           showModal,
                                                           handleModalToggle,
                                                           updatePaymentList,
                                                           editingPayment
                                                       }) => {

    const initialState = {
        id: 0,
        order_id: 0,
        amount: 0,
        payment_date: "",
    }

    const [newPaymentData, setNewPaymentData] = useState<Payment>(initialState);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (editingPayment) {
            setNewPaymentData(editingPayment);
            setIsEditing(true);
        } else {
            setNewPaymentData(initialState);
            setIsEditing(false);
        }
    }, [editingPayment]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const paymentsList = await getOrderByAvailableS();
                setCustomer(paymentsList);
            } catch (error) {
                console.error("Error fetching customer:", error);
            }
        };
        fetchPayments().then(r => console.log(r));
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        if (name === "payment_date") {
            const parts = value.split(/[-T:]/);
            const formattedDate = `${parts[0]}-${parts[1]}-${parts[2]}T${parts[3]}:${parts[4]}`;
            setNewPaymentData({...newPaymentData, [name]: formattedDate});
        } else {
            setNewPaymentData({...newPaymentData, [name]: value});
        }
    };

    const hanleSave = async () => {
        try {
            if (isEditing) {
                await updatePaymentS(newPaymentData);
            } else {
                await addPaymentS(newPaymentData);
            }
            handleModalToggle();
            updatePaymentList();
            console.log("Payment created/edited successfully");
        } catch (error) {
            console.error("Error creating/updating payment:", error);
        }
    }

    const handleCancel = () => {
        setNewPaymentData(initialState);
        handleModalToggle();
        setIsEditing(false);
    }

    return (
        <>
            <Modal
                isOpen={showModal}
                onRequestClose={handleModalToggle}
                contentLabel="Add Payment"
                className="add-modal"
                overlayClassName="modal-overlay"
            >
                <h2 className="modal-title text-center">
                    {isEditing ? "Edit Payment" : "Add Payment"}
                </h2>
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
                    {isEditing && (
                        <div className="form-group">
                            <label htmlFor="payment_date">Payment Date</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="payment_date"
                                name="payment_date"
                                value={newPaymentData.payment_date}
                                onChange={handleInputChange}
                            />
                        </div>
                    )
                    }
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            name="amount"
                            value={newPaymentData.amount}
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
                            onClick={hanleSave}
                            id="btn-primary"
                        >
                            {isEditing ? "Save" : "Add"}
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
        </>
    );
}

export default AddPaymentForm;