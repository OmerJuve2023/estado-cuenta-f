import Product from "../../classes/Product.ts";
import "../../CSS/CardStyle.css";
import {FaEdit, FaTrash} from "react-icons/fa";
import React from "react";

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({product, onEdit, onDelete}) => {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text fw-bold h5 text-center"><span style={{color: "blueviolet"}}>{product.name}</span></p>
                <p className="card-text fw-medium">Precio:<span className={"ms-2"} style={{color: "blueviolet"}}>
                    S/.{product.price}</span></p>
                <div className="d-flex justify-content-end align-items-center mt-3">
                    <button className="btn transparent-btn me-2" onClick={() => onEdit(product)}>
                        <FaEdit/> Editar
                    </button>
                    <button className="btn transparent-btn" onClick={() => onDelete(product.id)}>
                        <FaTrash/> Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

interface ViewProductProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (productId: number) => void;
}

const ViewProduct: React.FC<ViewProductProps> = ({products, onEdit, onDelete}) => {
    return (
        <div className="container">
            <div className="row">
                {products.map(product => (
                    <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
                        <ProductCard
                            product={product}
                            onEdit={() => onEdit(product)}
                            onDelete={onDelete}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewProduct;