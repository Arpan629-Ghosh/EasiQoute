export interface ApiResponse<T> {
  result: boolean;
  requestId: string;
  message: string;
  messageLBL: string;
  payload: T;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
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