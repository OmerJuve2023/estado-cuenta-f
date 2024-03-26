import Product from "../../classes/Product.ts";
import "../../CSS/CardStyle.css";
import {FaAngleDown, FaAngleUp, FaEdit, FaMoneyCheck, FaTrash, FaTshirt} from "react-icons/fa";
import React, {useState} from "react";

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({product, onEdit, onDelete}) => {
    const [showDetails, setShowDetails] = useState(false);
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    return (
        <div className="card border-0">
            <div className="card-body">
                <div className={"customer-info col-auto"}>
                    <p className="card-text fw-medium">
                        <FaTshirt className={"card-icon"}/>
                        {product.name}</p>
                    {showDetails && (
                        <div className={`customer-details ${showDetails ? 'show' : 'hide'}`}>
                            <p className="card-text fw-medium">
                                <FaMoneyCheck className={"card-icon"}/>
                                S/.{product.price}</p>
                        </div>
                    )}
                </div>
                <div className={"mt-auto"}>
                    <div className="action-buttons d-flex justify-content-center">
                        {showDetails ? (
                            <FaAngleUp className="expand-icon" onClick={toggleDetails}/>
                        ) : (
                            <FaAngleDown className="expand-icon" onClick={toggleDetails}/>
                        )}
                        <button className="btn transparent-btn me-2" onClick={() => onEdit(product)}>
                            <FaEdit/>
                        </button>
                        <button className="btn transparent-btn" onClick={() => onDelete(product.id)}>
                            <FaTrash/>
                        </button>
                    </div>
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