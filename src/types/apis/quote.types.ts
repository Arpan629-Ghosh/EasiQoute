import { AttachmentFile } from "@/screens/quotesScreens/newQuoteScreens/tabs/summuryScreen/SummuryScreen";
import { FetchItemsData } from "./settings.types";

export interface QuoteSummary {
  total_count: number;
  accepted_count: number;
  expired_count: number;
  pending_count: number;
}

export interface Status {
  id: number;
  status: string;
  display_name: string;
  color: string | null;
}

export interface QuoteItem {
  id: number;
  type: string;
  title: string;
  name: string;
  reference_number: string;
  is_editable: boolean;
  vat_setting_id: string;
  vat: number;
  status:
    | 'paid'
    | 'draft'
    | 'completed'
    | 'approved'
    | 'expired'
    | 'pending'
  | string;
  discount: number | null
  categorised: string;
  template: string;
  price: number;
  expiry_date: string;
  created_at: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface QuoteLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface QuoteMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface QuotesPayload {
  summary: QuoteSummary;
  data: QuoteItem[];
  links: QuoteLinks;
  meta: QuoteMeta;
}

export interface Client {
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
  recent_activities: [];
  created_at: string;
  updated_at: string;
}

export interface Financial_Summary {
  total_cost: number;
  sub_total: number;
  tax: number;
  discount: number;
  grand_total: number;
}

export interface CreateQuotePayload {
  id: number;
  title: string;
  job_description: string;
  notes: string;
  reference_number: string;
  quote_date: string;
  expiry_date: string;
  url: string;
  status: string;
  deposit_required: boolean;
  deposit_type: string | null;
  deposit_amount: number | null;
  deposit_percentage: string | null;
  categorised: string;
  template: string;
  is_editable: boolean;
  vat_setting_id: number;
  vat: number;
  is_company_phone_number_show: boolean;
  discount: string | null;
  client: Client;
  items: [];
  attachments: [];
  financial_summary: Financial_Summary;
  created_at: string;
  updated_at: string;
  route_url: string;
}

export interface CreateQuote {
  title: string;
  description: string;
  quote_date: string;
  expiry_date: string;
  client_id: number;
  attachments?: AttachmentFile[]
  notes: string;
}

export interface SectionsPayload {
  id: number;
  title: string;
  content: string;
  sort: string;
  is_added: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetSections{
  data: SectionsPayload[]
}

export interface Sections {
  id?: number;
  title: string;
  content: string;
  sort: number
}

export interface UpdateQuote {
  quoteId: number;
  items: FetchItemsData[]
}

export interface UpdateStatus {
  status: string
  quote_id: number;
}

export interface QouteSectionRequest {
  id?: number | undefined;
  title: string;
  content: string;
  sort: number;
  active?: number;
}

export interface QuoteSection {
  quote_id: number;
  sections: QouteSectionRequest[];
}

export interface QuoteSectionPayload {
  id: number;
  order_id: number;
  document_section_id: number;
  title: string;
  content: string;
  sort: number;
  active: number;
  created_at: string;
  updated_at: string;
}

export interface QuoteSectionData {
  data: QuoteSectionPayload[];
}