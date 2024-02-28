import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {addCustomerS, updateCustomerS} from "./CustomerService.ts";
import "../../CSS/AddForm.css";
import Customer from "../../classes/Customer.ts";

interface AddCustomerFormProps {
    showModal: boolean;
    handleModalToggle: () => void;
    updateCustomerList: () => void;
    editingCustomer: Customer | null; // Nuevo prop para pasar los datos del cliente en edición
}

Modal.setAppElement('#root');

const AddCustomerForm: React.FC<AddCustomerFormProps> = ({
                                                             showModal,
                                                             handleModalToggle,
                                                             updateCustomerList,
                                                             editingCustomer
                                                         }) => {
    const initialState = {
        name: "",
        email: "",
        phone: "",
        address: "",
    };

    const [newCustomerData, setNewCustomerData] = useState<Customer>(initialState);
    const [isEditing, setIsEditing] = useState(false); // Variable de estado para controlar si se está editando un cliente

    useEffect(() => {
        if (editingCustomer) {
            setNewCustomerData(editingCustomer);
            setIsEditing(true); // Establecer isEditing a true si hay un cliente en edición
        } else {
            setNewCustomerData(initialState);
            setIsEditing(false); // Establecer isEditing a false si no hay un cliente en edición
        }
    }, [editingCustomer]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setNewCustomerData({...newCustomerData, [name]: value});
    };

    const handleSave = async () => {
        try {
            if (isEditing) {
                await updateCustomerS(newCustomerData);
            } else {
                await addCustomerS(newCustomerData);
            }
            handleModalToggle();
            updateCustomerList();
            console.log("Cliente creado/editado con éxito");
        } catch (error) {
            console.error("Error creating/updating customer:", error);
        }
    };

    const handleCancel = () => {
        setNewCustomerData(initialState);
        handleModalToggle();
        setIsEditing(false); // Restablecer isEditing a false al cancelar
    };

    return (
        <Modal
            isOpen={showModal}
            onRequestClose={handleModalToggle}
            contentLabel={isEditing ? "Editar Cliente" : "Agregar Cliente"} // Usar isEditing para determinar el contenido del label
            className="add-modal"
            overlayClassName="modal-overlay"
        >
            <h2 className="modal-title text-center">{isEditing ? "Editar Cliente" : "Agregar Cliente"}</h2>
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
                        onClick={handleSave}
                        id="btn-primary"
                    >
                        {isEditing ? "Guardar Cambios" : "Crear Cliente"}
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
export default AddCustomerForm;
