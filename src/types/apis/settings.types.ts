export interface ChangePassword {
  old_password: string;
  new_password: string;
}

export interface CreateCategoriesPayload {
  id: number;
  name: string;
  subcategories_count: number;
  items_count: number;
}

export interface CreateCategories {
  id?: number;
  name: string;
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

export interface FetchCategoriesPayload {
  data: CreateCategoriesPayload[] | [];
  links: Links;
  meta: Meta;
}

export interface CreateSubCategories {
  id?: number;
  category_id: number;
  name: string;
}

export interface SubCategoriesPayload {
  id: number;
  name: string;
  products_count: number;
  category: {
    id: number;
    name: string;
    subcategories_count: number | null;
    items_count: number | null;
  };
}

export interface FetchSubCategoriesPayload {
  data: SubCategoriesPayload[] | [];
  links: Links;
  meta: Meta;
}

export interface CreateItemsPayload {
  id: number;
  type: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  total_price: number;
  cost: number;
  total_cost: number;
  is_added: false;
  category_id: number;
  category_name: string;
  subcategory_id: number;
  subcategory_name: string;
}

export interface CreateItems {
  id?: number;
  type: string;
  category_id: number;
  subcategory_id: number;
  name: string;
  unit: string;
  price: number;
  cost: number;
}

export interface FetchItemsData {
  id: number;
  type: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  total_price: number;
  cost: number;
  total_cost: number;
  is_added: boolean;
  category_id: number;
  category_name: string;
  subcategory_id: number | null;
  subcategory_name: string | null;
}

export interface FetchItemsPayload {
  data: FetchItemsData[];
  links: Links;
  meta: Meta;
}

export interface FetchItemsParams {
  category_id?: number;
  invoice_id?: number;
  is_added: boolean;
  quote_id?: boolean;
  search?: string;
  quote_template_id?: number;
  subcategory_ids?: number[];
}

export interface CreateTeamMember {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTeamMemberPayload {
  id?: number;
  name: string;
  email: string;
  password: string;
  active?: boolean;
}

export interface MemberDetails {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FetchTeamMembers {
  data: MemberDetails[];
  links: Links;
  meta: Meta;
}

export interface FetchTeamMembersPayload {
  search?: string;
  page: number;
}

export interface MeasurementUnit {
  id: string;
  description: string;
}

export interface QuoteCategory {
  id: number;
  name: string;
}

export interface QuoteInvoiceSettings {
  terms_and_conditions: string;
  footer_message: string;
  signature: string;
}

export interface VatSetting {
  id: number;
  name: string;
  description: string;
  value: string;
}

export interface BillingPreferences {
  vat: VatSetting;
  quote_expiration: number;
  payment_expiration: number;
}

export interface NotificationSettings {
  email_notification_enabled: boolean;
  push_notification_enabled: boolean;
}

export interface VerticalMarket {
  id: number | string;
  title: string;
  icon: string;
}

export interface DocumentSetting {
  categories: {
    by_item: string;
    by_category: string;
    by_subcategory: string;
    by_category_subcategory_item: string;
  };
  templates: {
    classic: string;
    modern: string;
    elegant: string;
  };
}

export interface QuoteInvoiceSettingsPayload {
  measurement_units: MeasurementUnit[];
  quote_categories: QuoteCategory[];
  quote_invoice_settings: QuoteInvoiceSettings;
  billing_preferences: BillingPreferences;
  notification_settings: NotificationSettings;
  vat_settings: VatSetting[];
  vertical_markets: VerticalMarket[];
  support_ticket_areas: unknown[];
  document_setting: DocumentSetting;
}
