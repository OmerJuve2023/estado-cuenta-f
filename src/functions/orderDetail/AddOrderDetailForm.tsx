import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import "../../CSS/AddForm.css";
import {OrderDetail} from "../../classes/OrderDetail.ts";
import {addOrderDetailS, updateOrderDetailS} from "./orderDetailService.ts";
import {getProductByNameS} from "../product/ProductService.ts";

interface AddOrderDetailFormProps {
    showModal: boolean;
    handleModalToggle: () => void;
    updateOrderDetailList: () => void;
    editingOrderDetail: OrderDetail | null;
}

Modal.setAppElement("#root");

const AddOrderDetailForm: React.FC<AddOrderDetailFormProps> = ({
                                                                   showModal,
                                                                   handleModalToggle,
                                                                   updateOrderDetailList,
                                                                   editingOrderDetail,
                                                               }) => {
    const initialOrderDetailData = {
        id: 0,
        order_id: 0,
        product_id: 0,
        quantity: 0,
        subtotal: 0,
    };

    const [newOrderDetailData, setNewOrderDetailData] = useState<OrderDetail>(
        initialOrderDetailData
    );
    const [isEditing, setIsEditing] = useState(false);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        if (editingOrderDetail) {
            setNewOrderDetailData(editingOrderDetail);
            setIsEditing(true);
        } else {
            setNewOrderDetailData(initialOrderDetailData);
            setIsEditing(false);
        }
    }, [editingOrderDetail]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productList = await getProductByNameS();
                setProducts(productList);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setNewOrderDetailData({...newOrderDetailData, [name]: value});
    };

    const handleCreateOrderDetail = async () => {
        try {
            if (isEditing) {
                await updateOrderDetailS(newOrderDetailData);
            } else {
                await addOrderDetailS(newOrderDetailData);
            }
            handleModalToggle();
            updateOrderDetailList();
            console.log("Order Detail created/edited successfully");
        } catch (error) {
            console.error("Error creating/editing order detail:", error);
        }
    };
    const handleCancel = () => {
        setNewOrderDetailData(initialOrderDetailData);
        handleModalToggle();
        setIsEditing(false);
    };

    return (
        <>
            <Modal
                isOpen={showModal}
                onRequestClose={handleModalToggle}
                contentLabel={isEditing ? "Editar Detalles " : "Agregar Detalles"}
                className="add-modal"
                overlayClassName="modal-overlay"
            >
                <h2 className="modal-title text-center">
                    {isEditing ? "Editar Detalles" : "Agregar Detalles"}
                </h2>
                <form>
                    <div>
                        <div className="form-group">
                            <label htmlFor="order_id">N° ID</label>
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
                            <label htmlFor="product_id">Producto</label>
                            <select
                                className="form-control"
                                id="product_id"
                                name="product_id"
                                value={newOrderDetailData.product_id}
                                onChange={handleInputChange}
                            >
                                <option value="">Select a product...</option>
                                {products && products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Cantidad</label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                name="quantity"
                                value={newOrderDetailData.quantity}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3 button-container">
                        <button
                            style={{
                                border: "none",
                            }}
                            type="button"
                            className="btn btn-primary"
                            onClick={handleCreateOrderDetail}
                            id="btn-primary"
                        >
                            {isEditing ? "Editar" : "Crear"}
                        </button>
                        <button
                            style={{
                                border: "none",
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
