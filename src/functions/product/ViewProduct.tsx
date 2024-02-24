import Product from "../../classes/Product.ts";
import "../../CSS/CardStyle.css";

const ProductCard = ({product}: { product: Product }) => {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text"><b>{product.name}</b></p>
                <p className="card-text"><b>Precio:</b><i className={"ms-2"}>{product.price}</i></p>
            </div>
        </div>
    );
}

const ViewProduct = (products: [Product]) => {
    return (
        <div className="container">
            <div className="row">
                {products.map(product => (
                    <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
                        <ProductCard product={product}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewProduct;
