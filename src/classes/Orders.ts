export interface Orders {
    id: number;
    customer_id: number;
    order_date: Date;
    total_amount: number;
    status: string;
    name: string;
}