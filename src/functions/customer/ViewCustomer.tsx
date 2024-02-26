import Customer from "../../classes/Customer.ts";
import "../../CSS/CardStyle.css";
import {FaEdit, FaTrash} from "react-icons/fa";
import React from "react";

interface CustomerCardProps {
    customer: Customer;
    onEdit: (customer: Customer) => void;
    onDelete: (customerId: number) => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onEdit, onDelete }) => {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text"><b>{customer.name}</b></p>
                <p className="card-text"><b>Email:</b><i className={"ms-2"}>{customer.email}</i></p>
                <p className="card-text"><b>Teléfono</b><i className={"ms-2"}>{customer.phone}</i></p>
                <p className="card-text"><b>Dirección</b><i className={"ms-2"}>{customer.address}</i></p>
                <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-sm btn-primary" onClick={() => onEdit(customer)}>
                        <FaEdit />
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(customer.id)}>
                        <FaTrash/>
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
const ViewCustomer: React.FC<ViewCustomerProps> = ({ customers, onEdit, onDelete }) => {
    return (
        <div className="container">
            <div className="row">
                {customers.map(customer => (
                    <div className="col-lg-4 col-md-6 mb-4" key={customer.id}>
                        <CustomerCard
                            customer={customer}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewCustomer;