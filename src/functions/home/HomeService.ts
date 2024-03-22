import {useEffect, useState} from "react";

import {getOrderByAvailableS, getOrderByCustomerS} from "../order/OrderService.ts";
import {getAllOrderByCustomerS} from "../orderDetail/orderDetailService.ts";


export interface Todo {
    name_customer: string;
    id_customer: number;
    orders: OrderHome[];
}

export interface OrderHome {
    id: number;
    order_date: string;
    total_amount: string;
    status: string;
    orderDetails: OrderDetailHome[];
}

interface Order {
    id: number;
    order_date: string;
    total_amount: string;
    status: string;
}

export interface OrderDetailHome {
    id: number;
    order_id: number;
    name: string;
    price: string;
    quantity: number;
    subtotal: string;
}

export function useHome() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchHome = async () => {
            setLoading(true);
            try {
                const customers = await getOrderByAvailableS();
                const todos: Todo[] = [];

                for (const customer of customers) {
                    const orders = await getOrderByCustomerS(customer.id);
                    const orderDetailsPromises = orders.map((order: Order) => getAllOrderByCustomerS(order.id));
                    const orderDetails = await Promise.all(orderDetailsPromises);

                    todos.push({
                        name_customer: customer.name,
                        id_customer: customer.id,
                        orders: orders.map((order: Order, index: number) => ({
                            ...order,
                            orderDetails: orderDetails[index]
                        }))
                    });
                }
                setTodos(todos);
            } catch (error) {
                console.error("Error fetching home:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHome().then(r => console.log(r));
    }, []);

    const updateHome = async () => {
        try {
            const updatedCustomers = await getOrderByAvailableS();
            console.log("Lista actualizada de clientes:", updatedCustomers);
            setTodos(updatedCustomers);
        } catch (error) {
            console.error("Error updating home:", error);
        }
    };
    return {todos, loading, updateHome};
}
