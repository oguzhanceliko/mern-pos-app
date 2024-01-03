import { IProduct } from "./product";

export interface ICustomer {
  _id: number;
  cartItems: IProduct[];
  customerName: string;
  customerPhoneNumber: string;
  paymentMode: string;
  subTotal: number;
  createdAt: string;
  tax: number;
  totalAmount: number;
}
