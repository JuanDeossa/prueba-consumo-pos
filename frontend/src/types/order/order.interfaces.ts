export enum UserRole {
  DEVELOPER = "DEVELOPER",
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface CreateOrder {
  products: {
    product_id: string;
    quantity: number;
    price: number;
  }[];
}

export interface OrderResponse {
  id: string;
  total: number;
  status: string;
  order_items_count: number;
}
