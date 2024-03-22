import PaginationTable from "./PaginationTable.tsx";
import {Todo, useHome} from "../functions/home/HomeService.ts";
import {useUI} from "../functions/FilterCustomer.ts";
import ViewHome from "../functions/home/ViewHome.tsx";
import {useState} from "react";

export function HomeComponent() {
    const {todos} = useHome();
    const {searchTerm, handleSearch, showModal, handleModalToggle} = useUI();
    const [editingHome, setEditingHome] = useState<Todo | null>(null);
    const filteredHome = todos.filter(todo => {
        return todo.name_customer.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleEdit = (home: Todo) => {
        setEditingHome(home);
        handleModalToggle();
    }
    const handleDelete = async (homeId: number) => {
        /*await deleteOrderDetailS(homeId);*/
        alert("Home eliminado");
    }
    const handleModalClose = () => {
        setEditingHome(null);
        handleModalToggle();
    }

    return (
        <div className={"container"}>
            <div className="mb-4 row align-items-center">
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
                    <ViewHome homes={home} onEdit={handleEdit} onDelete={handleDelete}/>
                )}
            </PaginationTable>
        </div>
    );
}