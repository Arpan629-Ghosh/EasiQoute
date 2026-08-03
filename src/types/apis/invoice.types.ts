import { AttachmentFile } from "@/screens/invoiceScreens/tabs/summuryScreen/SummuryScreen";
import { QuoteItem } from "./quote.types";
import { Clients } from "./client.types";
import { FetchItemsData } from "./settings.types";

export interface InvoiceResponse {
  payload: InvoicePayload;
}

export interface InvoicePayload {
  id: number;
  customer_id: number;
  invoice_number: string;
  title: string;
  invoice_date: string;
  due_date: string;
  paid_date: string | null;
  status: string;
  deposit_required: boolean;
  deposit_type: string | null;
  deposit_amount: number | null;
  deposit_available: number;
  message: string;
  notes: string | null;
  is_editable: boolean;
  url: string;
  categorised: string;
  template: string;
  is_company_phone_number_show: boolean;
  quote: InvoiceQuote;
  client: InvoiceClient;
  financial_summary: FinancialSummary;
  attachments: Attachment[] | [];
  items: InvoiceItem[] | [];
  payments: Payment[] | [];
  created_at: string;
  payment_method: string | null;
  route_url: string;
}

export interface InvoiceQuote {
  id: number;
  type: string;
  title: string;
  name: string;
  reference_number: string;
  is_editable: boolean;
  vat_setting_id: string;
  vat: number;
  discount: number | null;
  status: string;
  categorised: string;
  template: string;
  price: number;
  expiry_date: string;
  created_at: string;
}

export interface InvoiceClient {
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
  quote_accepted_count: number;
  total_invoices_amount: number;
  total_quotes_amount: number;
  available_credit: number;
  recent_activities: RecentActivity[];
  created_at: string;
  updated_at: string;
}

export interface FinancialSummary {
  vat: number;
  total_cost: number;
  sub_total: number;
  tax: number;
  discount: number;
  grand_total: number;
}

export interface InvoiceItem {
  id: number;
  type: string;
  category_id: number;
  category_name: string;
  subcategory_id: number | null;
  subcategory_name: string | null;
  name: string;
  unit: string;
  quantity: number;
  cost: number;
  total_cost: number;
  price: number;
  total_price: number;
}

export interface Attachment {
  // Add fields when the API starts returning attachment objects.
}

export interface Payment {
  // Add fields when the API starts returning payment objects.
}

export interface RecentActivity {
  // Add fields when the API starts returning recent activity objects.
}


export interface InvoiceCreate {
  quote_id?: number | undefined;
  invoice_date: string | undefined;
  due_date: string | undefined;
  message: string | undefined;
  notes: string | undefined;
  attachments?: AttachmentFile[] 
}

export interface UpdateInvoicePayload {
  invoice_id: number;
  invoice_summury?: InvoiceCreate;
  invoice_items: FetchItemsData[];
  discount: number;
}



export interface InvoiceListPayload {
  summary: InvoiceSummary;
  data: InvoiceListItem[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface InvoiceSummary {
  total_count: number;
  paid_count: number;
  outstanding_count: number;
  overdue_count: number;
}

export interface InvoiceListItem {
  id: number;
  type: string;
  title: string;
  name: string;
  reference_number: string;
  quote_reference_number: string;
  status: string;
  is_editable: boolean;
  price: number;
  total_due: number;
  expiry_date: string;
  created_at: string;
  deposit_required: boolean;
  deposit_type: string | null;
  deposit_amount: number | null;
  deposit_available: number;
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationMetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginationMetaLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface InvoiceDetailsPayload {
  id: number;
  customer_id: number;
  invoice_number: string;
  title: string;
  invoice_date: string;
  due_date: string;
  paid_date: string | null;
  status: string;
  deposit_required: boolean;
  deposit_type: string | null;
  deposit_amount: number | null;
  deposit_available: 0;
  message: string;
  notes: string | null;
  is_editable: boolean;
  url: string;
  categorised: string;
  template: string;
  is_company_phone_number_show: boolean;
  quote: QuoteItem;
  client: Clients;
  financial_summary: FinancialSummary;
  attachments: [];
  items: InvoiceItem[];
  payments: [];
  created_at: string;
  payment_method: string | null;
  route_url: string;
}

export interface UpdateInvoiceStatus {
  status: string;
  invoice_id: number;
}

