
export interface Order {
  _id: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  totalPrice: number;
  status: string;
  products: {
    product: {
      name: string;
      price: number;
    };
    quantity: number;
  }[];
  createdAt: string;
}

