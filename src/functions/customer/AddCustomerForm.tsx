import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { addCustomerS, updateCustomerS } from "./CustomerService.ts";
import "../../CSS/AddForm.css";
import Customer from "../../classes/Customer.ts";
import { FaPlus, FaSave, FaTimes } from "react-icons/fa";

Modal.setAppElement('#root');
interface AddCustomerFormProps {
    showModal: boolean;
    handleModalToggle: () => void;
    updateCustomerList: () => void;
    editingCustomer: Customer | null;
}

const AddCustomerForm: React.FC<AddCustomerFormProps> = ({
                                                             showModal,
                                                             handleModalToggle,
                                                             updateCustomerList,
                                                             editingCustomer
                                                         }) => {
    const initialCustomerState = {
        name: "",
        email: "",
        phone: "",
        address: ""
    };

    const [customerData, setCustomerData] = useState<Customer>(initialCustomerState);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (editingCustomer) {
            setCustomerData(editingCustomer);
            setIsEditing(true);
        } else {
            setCustomerData(initialCustomerState);
            setIsEditing(false);
        }
    }, [editingCustomer]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCustomerData({ ...customerData, [name]: value });
    };

    const handleSave = async () => {
        try {
            if (isEditing) {
                await updateCustomerS(customerData);
            } else {
                await addCustomerS(customerData);
            }
            handleModalToggle();
            updateCustomerList();
            console.log("Cliente creado/editado con éxito");
        } catch (error) {
            console.error("Error creating/updating customer:", error);
        }
    };

    const handleCancel = () => {
        setCustomerData(initialCustomerState);
        handleModalToggle();
        setIsEditing(false);
    };

    return (
        <Modal
            isOpen={showModal}
            onRequestClose={handleModalToggle}
            contentLabel={isEditing ? "Editar Cliente" : "Agregar Cliente"}
            className="add-modal"
            overlayClassName="modal-overlay"
        >
            <h2 className="modal-title text-center">{isEditing ? "Editar Cliente" : "Agregar Cliente"}</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        className="form-control fw-bold"
                        id="name"
                        name="name"
                        value={customerData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control fw-bold"
                        id="email"
                        name="email"
                        value={customerData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input
                        type="text"
                        className="form-control fw-bold"
                        id="phone"
                        name="phone"
                        value={customerData.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Dirección</label>
                    <input
                        type="text"
                        className="form-control fw-bold"
                        id="address"
                        name="address"
                        value={customerData.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="d-flex justify-content-center mt-3 button-container">
                    <button
                        style={{
                            border: "none"
                        }}
                        type="button"
                        className="btn btn-primary col-2"
                        onClick={handleSave}
                        id="btn-primary"
                    >
                        {isEditing ? <FaSave className="me-1"/> : <FaPlus className="me-1"/>}
                    </button>
                    <button
                        style={{
                            border: "none"
                        }}
                        type="button"
                        className="btn btn-secondary col-2"
                        onClick={handleCancel}
                        id="btn-secondary"
                    >
                        <FaTimes className="me-1"/>
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddCustomerForm;
