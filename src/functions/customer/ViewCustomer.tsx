import Customer from "../../classes/Customer.ts";
import "../../CSS/CardStyle.css";

const CustomerCard = ({customer}: { customer: Customer }) => {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text"><b>{customer.name}</b></p>
                <p className="card-text"><b>Email:</b><i className={"ms-2"}>{customer.email}</i></p>
                <p className="card-text"><b>Teléfono</b><i className={"ms-2"}>{customer.phone}</i></p>
                <p className="card-text"><b>Dirección</b><i className={"ms-2"}>{customer.address}</i></p>
            </div>
        </div>
    );
};
const ViewCustomer = (customers: Customer[]) => {
    return (
        <div className="container">
            <div className="row">
                {customers.map(customer => (
                    <div className="col-lg-4 col-md-6 mb-4" key={customer.id}>
                        <CustomerCard customer={customer}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewCustomer;
