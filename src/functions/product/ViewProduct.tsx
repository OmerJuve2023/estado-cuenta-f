import Product from "../../classes/Product.ts";
import "../../CSS/TableStyle.css";
export function viewProduct(products: [Product]) {

    return (
        <div className="table-responsive">
            <table className="table table-hover table-custom">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Descripción</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td className="text-primary fw-bold">{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}