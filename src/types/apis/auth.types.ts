
export interface Address {
  id: number
  address_line_1: string;
  address_line_2?: string | null;
  address_line_3?: string | null;
  address_line_4?: string | null;
  city: string | null;
  latitude?: string | null;
  longitude?: string | null;
  postcode: string | null;
  country: string 
}

export interface Company {
  id?: number;
  name: string;
  email?: string | null;
  phone_number: string;
  logo: {
    uri: string;
    type: string;
    fileName?: string;
  } | null;
  brand_color: string;
  vat_number: string | null;
  currency?: string;
  is_company_name_show?: boolean;
  address: string | undefined;
  city?: string | null;
  country?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  postcode?: string | null;
  billing_details?: BillingDetails | null;
  created_at?: string;
  updated_at?: string;
} 

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  company: Company | null;
  is_active: boolean;
  is_email_verified: boolean;
  is_profile_setup?: boolean;
  is_company_profile_setup?: boolean;
  created_at?: string;
  updated_at?: string
}

export interface BillingDetails {
  id: number
  name?: string;
  email?: string;
  phone: string;
  bank_name?: string | null;
  sort_code?: string | null;
  account_number?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
  device_type: 'android' | 'ios';
  push_token?: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  device_type: "android" | "ios"
  push_token?: string;
}

export interface ForgotPasswordPayload{
    email: string
}


export interface ProfileSetupPayload {
  name: string;
  phone: string;
  avatar?: {
    uri: string;
    type: string;
    fileName?: string;
  } | null;
}

export interface SearchAddressPayload {
  postcode: string;
  latitude: number;
  longitude: number;
  formatted_address: string;
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  address_line_4: string;
  city: string;
  county: string;
  district: string;
  country: string;
  manually: boolean;
}


export interface AuthPayload extends User {
    access_token: string;
}

