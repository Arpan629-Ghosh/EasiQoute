import { Links, Meta } from "./common.types";


export interface Data {
  id: number;
  payment_method: 'cash' | 'stripe';
  amount_type: 'deposit' | 'invoice';
  status: string;
  amount: number;
  amount_formatted: string;
  allocated: string;
  credit: string;
  currency: string;
  payment_date: string;
  stripe_payment_link_url: string | null;
  client_name: String;
  client_email: string;
  payment_link_url: string | null;
}

export interface PaymentPayload{
    data: Data[];
    links: Links;
    meta: Meta;
}

export interface PaymentQueryParams{
  
    search?: string;
    page?: number
}

export interface PaymenDetailsPayload {
  id: number;
  reference: string;
  client_name: string;
  client_email: string;
  amount: string;
  currency: string;
  date: string;
  type: string;
  method: 'Cash' | 'stripe';
  status: 'received' | 'pending';
  credit_remaining: number;
  paid_at: string;
  allocations: Allocation[];
}

export interface Allocation {
  invoice_id: number;
  reference: string;
  title: string;
  status: string;
  due_date: string;
  amount: string;
  currency: string;
} 

export interface CreatePayment {
  id: number;
  payment_method: 'cash' | 'stripe';
  amount_type: 'invoice' | 'deposit';
  status: string;
  amount: number;
  amount_formatted: string;
  allocated: string;
  credit: string;
  currency: string;
  payment_date: string;
  stripe_payment_link_url: string | null;
  client_name: string;
  client_email: string;
  payment_link_url: string | null;
}

export interface CreatePaymentPayload {
  payment: CreatePayment;
  invoice_status: string;
  amount_due: number;
  deposit_covered: number;
  remaining: number;
  deposit_adjustments: [];
}
