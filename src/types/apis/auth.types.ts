
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

export interface CompanyAddress {
  id: number;
  address: string;
  city: string;
  state: string | null;
  country: string;
  latitude: string | null;
  longitude: string | null;
  postcode: string;
}

export interface Company {
  id?: number;
  name: string;
  email?: string | null;
  phone_number: string;
  logo: string | null;
  brand_color: string;
  vat_number: string | null;
  currency?: string;
  is_company_name_show?: boolean;
  address: CompanyAddress | undefined;
  city?: string | null;
  country?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  postcode?: string | null;
  billing_details?: BillingDetails | null;
  created_at?: string;
  updated_at?: string;
} 

export interface CompanyPayload {
  name: string;
  logo?: {
    uri: string;
    type: string;
    fileName?: string;
  } | null;
  address?: string | null;
  postcode?: string | null;
  country?: string | null;
  city?: string | null;
  phone_number: string;
  vat_number: string | null;
  brand_color: string;
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

export interface UserDeatails {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  is_email_verified: boolean;
  is_active: boolean;
  avatar: string;
  company: CompanyDetails;
  email_notification_enabled: boolean;
  push_notification_enabled: boolean;
  is_profile_setup: boolean;
  is_company_profile_setup: boolean;
  created_at: string;
  updated_at: string;
  is_subscription_active: boolean;
  subscription_ended_at: null;
  is_trial_period: boolean;
  subscription_amount: null;
  hasBankAccountDetailAdded: boolean;
  hasSignatureAdded: boolean;
  is_team_member: boolean;
  default_payment_method: string;
  stripe_connected: boolean;
  stripe_account_status: string;
}

interface CompanyDetails {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  logo: null;
  brand_color: string;
  vat_number: string;
  currency: string;
  is_company_name_show: boolean;
  address: AddressDetails;
  billing_details: Billingdetails;
  created_at: string;
  updated_at: string;
}

interface Billingdetails {
  id: number;
  name: string;
  email: string;
  phone: string;
  bank_name: string;
  sort_code: string;
  account_number: string;
  created_at: null;
  updated_at: null;
}

interface AddressDetails {
  id: number;
  address: string;
  city: string;
  state: string | null;
  country: string;
  latitude: string | null;
  longitude: string | null;
  postcode: string;
}