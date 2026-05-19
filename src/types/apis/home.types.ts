
export interface HomeScreenResponse {
  invoiceDetails: InvoiceDetails;
  quoteDetails: QuoteDetails;
  financialSummary: FinancialSummary;
  recentActivities: RecentActivity[];
}

export interface InvoiceDetails {
  outstanding_invoices_amount: number;
  overdue_invoices: number;
}

export interface QuoteDetails {
  pending_quotes_amount: number;
  active_quotes: number;
}

export interface FinancialSummary {
  money_due_this_week: number;
  quotes_accepted_not_invoiced: number;
}

export interface RecentActivity {
  id: number;
  type: string;
  title: string;
  name: string;
  reference_number: string;
  status: 'draft' | 'approved' | 'paid' | 'completed' | 'due';
  is_editable: boolean;
  price: number;
  expiry_date: string;
  created_at: string;
  total_due?: number;
  deposit_required?: boolean;
  deposit_type?: string | null;
  deposit_amount?: number | null;
  deposit_available?: number;
  vat_setting_id?: string;
  vat?: number;
  discount?: number | null;
  categorised?: string;
  template?: string;
}

