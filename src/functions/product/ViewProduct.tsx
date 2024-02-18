import Product from "../../classes/Product.ts";

export function viewProduct(products: [Product]) {

    return (
        <div className="container">
            <h1 className="mb-4">Productos</h1>
            <table className="table table-hover">
                <thead className="thead-dark">
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