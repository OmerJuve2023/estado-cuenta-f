import '../CSS/Header.css';

export function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <span className="bi bi-shop"></span> {/* Icono de tienda */}
                        Luzmi Pedidos
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#/list/pedido">
                                    <span className="bi bi-cart"></span> {/* Icono de carrito */}
                                    Pedido
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/list/orderDetail">
                                    <span
                                        className="bi bi-card-checklist"></span> {/* Icono de lista de verificación */}
                                    Detalles de la Orden
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/list/products">
                                    <span className="bi bi-archive"></span> {/* Icono de archivo */}
                                    Productos
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/list/client">
                                    <span className="bi bi-people"></span> {/* Icono de personas */}
                                    Clientes
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/list/payment">
                                    <span className="bi bi-credit-card"></span> {/* Icono de tarjeta de crédito */}
                                    Pagos
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}