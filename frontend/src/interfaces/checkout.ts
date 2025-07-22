export interface Checkout{
    user_id: number,
    email: string,
    amount: number,
    payment_redirect_url: string,
    user_shipping_address_id?: number,
    shipping_address?: {
        first_name: string,
        last_name: string,
        email: string,
        phone: string,
        street_address: string,
        state: string,
        city: string,
        zip: string
    },
    items: ItemsInCheckout[],
    payment_method: string
}

export interface ItemsInCheckout{
    product_id: number,
    product_quantity: number,
    total_amount: number
}