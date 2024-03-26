import Customer from "../../classes/Customer.ts";
import "../../CSS/CardStyle.css";
import {FaAngleDown, FaAngleUp, FaEdit, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaTrash, FaUser} from "react-icons/fa";
import React, {useState} from "react";

interface CustomerCardProps {
    customer: Customer;
    onEdit: (customer: Customer) => void;
    onDelete: (customerId: number) => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({customer, onEdit, onDelete}) => {
    const [showDetails, setShowDetails] = useState(false);
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    return (
        <div className="card border-0">
            <div className="card-body">
                <div className="customer-info col-auto">
                    <p className="card-text fw-medium"><FaUser className={"card-icon"}/> {customer.name}</p>
                    {showDetails && (
                        <div className={`customer-details ${showDetails ? 'show' : 'hide'}`}>
                            <p className="card-text fw-medium"><FaEnvelope className={"card-icon"}/> {customer.email}</p>
                            <p className="card-text fw-medium"><FaPhoneAlt className={"card-icon"}/> {customer.phone}</p>
                            <p className="card-text fw-medium"><FaMapMarkerAlt className={"card-icon"}/> {customer.address}</p>
                        </div>
                    )}
                </div>
                <div className="mt-auto">
                    <div className="action-buttons d-flex justify-content-center">
                        {showDetails ? (
                            <FaAngleUp className="expand-icon" onClick={toggleDetails} />
                        ) : (
                            <FaAngleDown className="expand-icon" onClick={toggleDetails} />
                        )}
                        <button className="btn transparent-btn me-2" onClick={() => onEdit(customer)}>
                            <FaEdit/>
                        </button>
                        <button className="btn transparent-btn" onClick={() => onDelete(customer.id)}>
                            <FaTrash/>
                        </button>

                    </div>
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