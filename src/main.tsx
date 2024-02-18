import React from 'react'
import ReactDOM from 'react-dom/client'
import {createHashRouter, RouterProvider} from "react-router-dom";
import {Header} from "./components/Header.tsx";
import {DataViewProduct} from "./components/productComponent.tsx";
import {DataViewOrder} from "./components/orderComponent.tsx";
import {DataViewCustomer} from "./components/customerComponent.tsx";
import {DataViewPayment} from "./components/paymentComponent.tsx";
import {DataViewOrderDetail} from "./components/orderDetailComponent.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";


const router = createHashRouter([
    {
        path: '/',
        element: <DataViewOrder/>
    },
    {
        path: '/list/products',
        element: <DataViewProduct/>
    },
    {
        path: '/list/pedido',
        element: <DataViewOrder/>
    },
    {
        path: '/list/client',
        element: <DataViewCustomer/>
    },
    {
        path: '/list/payment',
        element: <DataViewPayment/>
    }, {
        path: '/list/orderDetail',
        element: <DataViewOrderDetail/>,
    }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Header/>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
