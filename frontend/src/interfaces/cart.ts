export interface Cart {
  local_items?: InternationalItem[];
  international_items?: InternationalItem[];
  total_local_price: number;
  total_international_price: number;
}

export interface InternationalItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    currency: string;
    category: {
      category_id: number;
      category_name: string;
      sub_category_id: number;
      sub_category_name: string;
    };
    sub_category?: string;
    product_price: number;
    discount_price: number;
    price: number;
  };
  seller: {
    first_name: string;
    last_name: string;
  };
  total_price: number;
}

export interface LocalItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    slug: string;
    currency: string;
    description: string;
    category: {
      category_id: number;
      category_name: string;
      sub_category_id: number;
      sub_category_name: string;
    };
    sub_category?: string;
    product_price: number;
    discount_price: number;
    price: number;
  };
  seller: {
    first_name: string;
    last_name: string;
  };
  total_price: number;
}
