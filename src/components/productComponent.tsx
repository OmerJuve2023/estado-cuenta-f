import React from "react";
import Product from "../classes/Product.ts";
import {viewProduct} from "../functions/product/ViewProduct.tsx";
import PaginationTable from "./PaginationTable.tsx";
import {useUI} from "../functions/FilterCustomer.ts";
import {useProducts} from "../functions/product/ProductService.ts";
import {FaUserPlus} from "react-icons/fa";
import AddProductForm from "../functions/product/AddProduct.tsx";

export function DataViewProduct() {
    const {products, updateProducts} = useProducts();
    const {searchTerm, handleSearch, showModal, handleModalToggle} = useUI();
    const filteredProducts = products.filter(customer => {
        return customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return (
        <div className="container">
            <h1 className="mb-4 mt-5 text-center clientes-title display-4 display-md-3">Gestión de Productos</h1>
            <div className="mb-4 row align-items-center"> {/* Contenedor para el campo de búsqueda y el botón */}
                <div className="col-sm-8 col-md-6"> {/* Columna para el campo de búsqueda */}
                    <div className="input-group search-bar">
                        <input
                            style={{
                                boxShadow: "none",
                            }}
                            type="search"
                            className="form-control search-input" // Aplicamos la clase personalizada al campo de búsqueda
                            placeholder="Buscar por nombre"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className="col-sm-4 col-md-6 mt-3 mt-sm-0"> {/* Columna para el botón */}
                    <div className="d-grid"> {/* Utilizamos una cuadrícula (grid) */}
                        <button className="btn btn-custom btn-block"
                                onClick={handleModalToggle}> {/* Aplicamos la clase personalizada al botón y lo hacemos ocupar toda la fila */}
                            <FaUserPlus className="me-1"/>
                            Agregar Producto
                        </button>
                    </div>
                </div>
            </div>
            <PaginationTable<Product> items={filteredProducts} itemsPerPage={7}>
                {viewProduct as (items: Product[]) => React.ReactNode}
            </PaginationTable>
            <AddProductForm
                showModal={showModal}
                handleModalToggle={handleModalToggle}
                updateProductList={updateProducts}
            />
        </div>
    )
}
