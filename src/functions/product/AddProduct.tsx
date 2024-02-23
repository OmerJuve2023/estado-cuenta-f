import Modal from "react-modal";
import "../../CSS/AddForm.css";
import React, {useState} from "react";
import {addProduct, createProduct} from "../../services/productService.ts";


interface AddProductFormProps {
    showModal: boolean;
    handleModalToggle: () => void;
    updateProductList: () => void;
}

Modal.setAppElement('#root');

const AddProductForm: React.FC<AddProductFormProps> = ({showModal, handleModalToggle, updateProductList}) => {
    const [newProductData, setNewProductData] = useState<addProduct>(
        {
            name: "",
            price: 0,
            description: ""
        }
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setNewProductData({...newProductData, [name]: value});
    };

    const handleCreateProduct = async () => {
        try {
            await createProduct(newProductData);
            handleModalToggle();
            updateProductList();
            alert("Product created successfully")
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <>
            <Modal
                isOpen={showModal}
                onRequestClose={handleModalToggle}
                contentLabel="Add Product"
                className="add-modal"
                overlayClassName="modal-overlay"
            >
                <h2 className="modal-title text-center">Add Product</h2>
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
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleCreateProduct}
                        >
                            Add Product
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleModalToggle}>
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default AddProductForm;