import Product from "../classes/Product.ts";
import {useEffect, useState} from "react";
import {listProducts} from "../services/productService.ts";
import {viewProduct} from "../functions/product/ViewProduct.tsx";
import PaginationTable from "./PaginationTable.tsx";

export function DataViewProduct() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const productsList = await listProducts();
                setProducts(productsList)
                setFilteredProducts(productsList)
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts().then(r => console.log(r));
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        filterProducts(event.target.value);
    };

    const filterProducts = (term: string) => {
        const filtered = products.filter(product => {
            return product.name.toLowerCase().includes(term.toLowerCase());
        });
        setFilteredProducts(filtered);
    };

    const currentProducts = filteredProducts.slice(0, 10);

    return (
        loading ? (
            <div>Loading...</div>
        ) : (
            <div className="container">
                <h1 className="mb-4">Productos</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <PaginationTable<Product> items={products} itemsPerPage={4}>
                    {() => (
                        viewProduct(currentProducts as [Product])
                    )}
                </PaginationTable>
            </div>
        )
    )
}