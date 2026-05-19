export interface QuoteSummary {
  total_count: number;
  accepted_count: number;
  expired_count: number;
  pending_count: number;
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


