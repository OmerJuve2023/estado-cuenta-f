import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {addProductS, updateProductS} from "./ProductService.ts";
import "../../CSS/AddForm.css";
import Product from "../../classes/Product.ts";

interface AddProductFormProps {
    showModal: boolean;
    handleModalToggle: () => void;
    updateProductList: () => void;
    editingProduct: Product | null;
}

Modal.setAppElement('#root');


const AddProductForm: React.FC<AddProductFormProps> = ({
                                                           showModal,
                                                           handleModalToggle,
                                                           updateProductList,
                                                           editingProduct
                                                       }) => {

    const initialState = {
        name: "",
        price: 0,
        description: ""
    };

    const [newProductData, setNewProductData] = useState<Product>(initialState);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (editingProduct) {
            setNewProductData(editingProduct);
            setIsEditing(true);
        } else {
            setNewProductData(initialState);
            setIsEditing(false);
        }
    }, [editingProduct]);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setNewProductData({...newProductData, [name]: value});
    };

    const handleSave = async () => {
        try {
            if (isEditing) {
                await updateProductS(newProductData);
            } else {
                await addProductS(newProductData);
            }
            handleModalToggle();
            updateProductList();
            console.log("Product created/edited successfully");
        } catch (error) {
            console.error("Error creating/editing product:", error);
        }
    }

    const handleCancel = () => {
        // Resetear el estado a los valores iniciales
        setNewProductData(initialState);
        // Cerrar el modal
        handleModalToggle();
    }

    return (
        <>
            <Modal
                isOpen={showModal}
                onRequestClose={handleModalToggle}
                contentLabel={isEditing ? "Edit Product" : "Add Product"}
                className="add-modal"
                overlayClassName="modal-overlay"
            >
                <h2 className="modal-title text-center">
                    {isEditing ? "Edit Product" : "Add Product"}
                </h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={newProductData.name}
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
                            value={newProductData.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            value={newProductData.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="d-flex justify-content-center mt-3 button-container">
                        <button
                            style={{
                                border: "none",
                            }}
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSave}
                            id={"btn-primary"}
                        >
                            {isEditing ? "Edit" : "Add"}
                        </button>
                        <button
                            style={{
                                border: "none",
                            }}
                            type="button"
                            className="btn btn-secondary"
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
}

export default AddProductForm;