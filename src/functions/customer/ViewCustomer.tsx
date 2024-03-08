import Customer from "../../classes/Customer.ts";
import "../../CSS/CardStyle.css";
import {FaEdit, FaTrash} from "react-icons/fa";
import React from "react";

interface CustomerCardProps {
    customer: Customer;
    onEdit: (customer: Customer) => void;
    onDelete: (customerId: number) => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({customer, onEdit, onDelete}) => {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text fw-bold text-center h5" style={{color: "blueviolet"}}>{customer.name}</p>
                {/*<p className="card-text fw-medium">Email:<span className={"ms-2"} style={{color: "blueviolet"}}>
                    {customer.email}</span></p>
                <p className="card-text fw-medium">Teléfono<span className={"ms-2"} style={{color: "blueviolet"}}>
                    {customer.phone}</span></p>
                <p className="card-text fw-medium">Dirección
                    <i className={"ms-2"}style={{color: "blueviolet"}}>
                        {customer.address}</i></p>*/}
                <div className="d-flex justify-content-end align-items-center mt-3">
                    <button className="btn transparent-btn me-2" onClick={() => onEdit(customer)}>
                        <FaEdit/> Editar
                    </button>
                    <button className="btn transparent-btn" onClick={() => onDelete(customer.id)}>
                        <FaTrash/> Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

interface ViewCustomerProps {
    customers: Customer[];
    onEdit: (customer: Customer) => void;
    onDelete: (customerId: number) => void;
}

const ViewCustomer: React.FC<ViewCustomerProps> = ({customers, onEdit, onDelete}) => {
    return (
        <div className="container">
            <div className="row">
                {customers.map(customer => (
                    <div className="col-lg-4 col-md-6 mb-4" key={customer.id}>
                        <CustomerCard
                            customer={customer}
                            onEdit={() => onEdit(customer)}
                            onDelete={onDelete}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewCustomer;