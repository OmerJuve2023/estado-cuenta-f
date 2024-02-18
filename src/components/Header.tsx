import '../CSS/Header.css';

export function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/">Admin Dashboard</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#/list/pedido">Pedido</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/list/orderDetail">Detalles de la Orden</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/list/products">Productos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/list/client">Clientes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/list/payment">Pagos</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}