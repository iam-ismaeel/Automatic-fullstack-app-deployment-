export interface Profile {
  id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  middlename: string;
  email: string;
  address: string;
  city: string;
  postal_code: string;
  phone: string;
  country_id: string;
  state_id: string;
  referrer_code: string;
  referrer_link: string;
  date_of_birth: string;
  is_verified: boolean;
  income_type: string;
  image: string;
  type: string;
  is_affiliate_member: boolean;
  two_factor_enabled: boolean;
  status: string;
  wallet: {
    available_balance?: any;
    total_income: number;
    total_withdrawal: number;
  };
  no_of_referrals: number;
  bank_account: {
    account_name?: any;
    bank_name?: any;
    account_number?: any;
  };
  business_info: {
    business_location?: any;
    business_type?: any;
    identity_type?: any;
    file?: any;
    status?: any;
  };
  shipping_address: ShippingAddress[];
}

export interface ShippingAddress {
  id: number;
  street_address: string;
  state: string;
  city: string;
}

export interface UpdateProfileSettingsPayload {
  two_factor_enabled?: number;
  password?: string;
  password_confirmation?: string;
}
