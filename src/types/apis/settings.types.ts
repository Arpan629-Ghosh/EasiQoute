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
    name: string;
}

export interface FetchCategoriesPayload {
    data: CreateCategoriesPayload[];
}