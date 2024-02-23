import {useEffect, useState} from "react";
import Product from "../../classes/Product.ts";
import {listProducts} from "../../services/productService.ts";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const productsList = await listProducts();
                setProducts(productsList)
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts().then(r => console.log(r));
    }, []);
    const updateProducts = async () => {
        try {
            const updatedProducts = await listProducts();
            console.log("Lista actualizada de productos:", updatedProducts);
            setProducts(updatedProducts);
        } catch (error) {
            console.error("Error updating products:", error);
        }
    }
    return {products, loading, updateProducts};
}