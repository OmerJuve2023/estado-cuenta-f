import Customer from "../../classes/Customer.ts";
import "../../CSS/TableStyle.css";

export default function ViewCustomer(customers: [Customer]) {
    return (
        <div>
            <div className="table-responsive">
                <table className="table table-hover table-custom">
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
}