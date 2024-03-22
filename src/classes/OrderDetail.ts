export interface OrderDetail {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    subtotal: number;
    customer: string;
    product: string;
}