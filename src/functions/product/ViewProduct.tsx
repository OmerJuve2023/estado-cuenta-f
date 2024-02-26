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

/*import Product from "../../classes/Product.ts";
import "../../CSS/CardStyle.css";
import { useState, useEffect } from "react"; // Agrega useEffect para cargar los productos

const ProductCard = ({ product, onDelete }: { product: Product, onDelete: () => void }) => {
    const handleDelete = async () => {
        try {
            onDelete(); // Llama a la función onDelete antes de eliminar el producto
            // Agrega lógica para eliminar el producto aquí
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text"><b>{product.name}</b></p>
                <p className="card-text"><b>Precio:</b><i className={"ms-2"}>{product.price}</i></p>
                <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
            </div>
        </div>
    );
}

const ViewProduct = ({ products }: { products: Product[] }) => {
    const [productList, setProductList] = useState<Product[]>([]);

    // Utiliza useEffect para actualizar la lista de productos cuando cambia la lista de productos prop
    useEffect(() => {
        setProductList(products);
    }, [products]);

    const handleDeleteProduct = (productId: number) => {
        setProductList(productList.filter(product => product.id !== productId));
    };

    return (
        <div className="container">
            <div className="row">
                {productList.map(product => (
                    <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
                        <ProductCard product={product} onDelete={() => handleDeleteProduct(product.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewProduct;*/



