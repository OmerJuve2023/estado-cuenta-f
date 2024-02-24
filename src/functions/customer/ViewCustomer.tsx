//import Customer from "../../classes/Customer.ts";
/*import "../../CSS/CardStyle.css";

export default function ViewCustomer(customers: [Customer]) {
    return (
        <div>
            <div className="table-responsive">
                <table className="table table-hover table-custom table-striped">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Email</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Dirección</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td className="text-primary fw-bold">{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}*/
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
