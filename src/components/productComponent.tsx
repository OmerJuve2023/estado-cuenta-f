import Product from "../classes/Product.ts";
import {useEffect, useState} from "react";
import {listProducts, createProduct, deleteProduct, getProduct} from "../services/productService.ts";
import {viewProduct} from "../functions/product/ViewProduct.tsx";

export function DataViewProduct() {

    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const fetchedProducts = await listProducts();
            setProducts(fetchedProducts);
        };
        fetchData().then(r => console.log(r));
    }, []);
    return (viewProduct(products as [Product]))
}

export function DataInsertProduct(Product: Product) {
    createProduct(Product).then(r => console.log(r));
}

export function DataDeleteProduct(id: number) {
    deleteProduct(id).then(r => console.log(r));
}

export function DataUpdateProduct(Product: Product) {
    createProduct(Product).then(r => console.log(r));
}

/*export function DataGetProduct(id: number) {
    const [product, setProduct] = useState<Product[]>();
    useEffect(() => {
        const fetchData = async () => {
            const fetchedProduct = await getProduct(id);
            setProduct(fetchedProduct);
        };
        fetchData().then(r => console.log(r));
    }, []);
}*/
