export interface IUserData {
  two_factor_enabled: boolean | undefined;
  address: string;
  bank_account: {
    account_name: string;
    bank_name: string;
    account_number: string;
  };
  business_info: {
    business_location: string;
    business_type: string;
    identity_type: string;
    file: string;
    status: string;
  };
  business_name: string;
  city: string;
  country: string;
  country_id: string;
  state_id: string;
  date_of_birth: string;
  email: string;
  first_name: string;
  middle_name: string;
  id: number;
  image: string;
  income_type: string;
  is_affiliate_member: boolean;
  is_verified: number;
  last_name: string;
  no_of_referrals: number;
  phone: string;
  postal_code: string;
  referrer_code: string;
  referrer_link: Referrers[];
  status: string;
  uuid: number;
  wallet: {
    available_balance: any;
    total_income: number;
    total_withdrawal: number;
  };
  token?: string;
  user_type?: string;
  has_signed_up?: boolean;
  user_subscription_plan: {
    expired_at: string;
    id: number;
    plan: string;
    plan_end: string;
    plan_start: string;
    status: string;
    subscription_plan_id: 0;
  };
  default_currency: string;
  rewards: RewardPoints[];
  user_rewards: any[];
}

export interface RewardPoints {
  description: string;
  icon: string;
  id: number;
  name: string;
  points: number;
  verification_type: string;
}

export interface Referrers {
  name: string;
  link: string;
}
