import PaginationTable from "./PaginationTable.tsx";
import {Todo, useHome} from "../functions/home/HomeService.ts";
import {useUI} from "../functions/FilterCustomer.ts";
import ViewHome from "../functions/home/ViewHome.tsx";

export function HomeComponent() {
    const {todos} = useHome();
    const {searchTerm, handleSearch, handleModalToggle} = useUI();
    const filteredHome = todos.filter(todo => {
        return todo.name_customer.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div>
            <div className={"container"}>
                <h1 className="mb-4 mt-5 text-center clientes-title display-4 display-md-3">Luzmi Pedidos</h1>
                <div className="container mb-4 row align-items-center">
                    <div className="col-sm-8 col-md-6">
                        <div className="input-group search-bar">
                            <input
                                style={{
                                    boxShadow: "none",
                                }}
                                type="search"
                                className="form-control search-input"
                                placeholder="Buscar por nombre"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-6 mt-3 mt-sm-0">
                        <div className="d-grid">
                            <button className="btn btn-custom btn-block"
                                    onClick={handleModalToggle}>
                                Agregar Home
                            </button>
                        </div>
                    </div>
                </div>
                <PaginationTable<Todo> items={filteredHome} itemsPerPage={7}>
                    {(home: Todo[]) => (
                        <ViewHome homes={home}/>
                    )}
                </PaginationTable>
            </div>
        </div>
    );
}