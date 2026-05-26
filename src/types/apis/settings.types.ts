export interface ChangePassword{
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
    items_count: number | null
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
  subcategory_id: number
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