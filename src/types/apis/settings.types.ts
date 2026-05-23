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

export interface CategoriesLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface CategoriesMeta {
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
    links: CategoriesLinks;
    meta: CategoriesMeta;
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
  links: CategoriesLinks;
  meta: CategoriesMeta;
}