export interface Address {
  id: number;
  address_line_1: string;
  address_line_2: string | null;
  address_line_3: string | null;
  address_line_4: string | null;
  city: string | null;
  latitude: string | null;
  longitude: string | null;
  postcode: string | null;
}

export interface Company{
    id: number;
    name: string;
    email: string | null;
    logo: string | null;
    address: Address;
    createdAt?: string;
    updatedAt?: string;
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

export interface AuthPayload extends User {
    access_token: string;
}

