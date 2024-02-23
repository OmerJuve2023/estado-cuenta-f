import React, {useState} from "react";
import {addCustomer, createCustomer} from "../../services/customerService.ts";
import Modal from "react-modal";
import "../../CSS/AddForm.css";

interface AddCustomerFormProps {
    showModal: boolean;
    handleModalToggle: () => void;
    updateCustomerList: () => void;
}

Modal.setAppElement('#root');
const AddCustomerForm: React.FC<AddCustomerFormProps> = ({showModal, handleModalToggle, updateCustomerList,}) => {
    const [newCustomerData, setNewCustomerData]
        = useState<addCustomer>(
        {
            name: "",
            email: "",
            phone: "",
            address: "",
        }
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setNewCustomerData({...newCustomerData, [name]: value});
    };

    const handleCreateCustomer = async () => {
        try {
            await createCustomer(newCustomerData);
            handleModalToggle();
            updateCustomerList();
            alert("Cliente creado con éxito")
        } catch (error) {
            console.error("Error creating customer:", error);
        }
    };

    return (
        <Modal
            isOpen={showModal}
            onRequestClose={handleModalToggle}
            contentLabel="Agregar Cliente"
            className="add-modal" // Clase CSS para personalizar el modal
            overlayClassName="modal-overlay" // Clase CSS para personalizar el overlay del modal
        >
            <h2 className="modal-title text-center">Agregar Cliente</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={newCustomerData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={newCustomerData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={newCustomerData.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={newCustomerData.address}
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
                        onClick={handleCreateCustomer}
                        id="btn-primary"
                    >
                        Crear Cliente
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

    );
};

export default AddCustomerForm;
