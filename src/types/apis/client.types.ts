import { RecentActivity } from "./home.types";

export interface CreateClientPayload {
  id: number;
  name: string;
  company_name: string;
  phone: string;
  email: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Clients {
  id: number;
  name: string;
  company_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  total_invoices: number;
  total_quotes: number;
  total_invoices_amount: number;
  total_quotes_amount: number;
  available_credit: number;
  recent_activities: RecentActivity[];
  created_at: string;
  updated_at: string;
}

export interface GetClientsPayload {
    data: Clients[];
    links: Links;
    meta: Meta;
}

export interface CreateClient{
    email: string;
    phone: string;
    name: string;
    company_name: string;
    address: string;
    city: string;
    postcode: string;
    country: string;
}