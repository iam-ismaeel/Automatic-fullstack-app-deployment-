export interface IAffiliatePayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  referrer_code?: string;
}

export interface ICreateBankAccount {
  user_id: number;
  type: string;
  swift?: string;
  bank_branch?: string;
  paypal_email?: string;
  account_holder_name?: string;
  bank_name?: string;
  account_number?: string;
}

export interface IWithdrawFunds {
  user_id: number;
  amount: number;
}

export interface Referrals {
  message: string;
  status: boolean;
  data: {
    total_referrals: string;
    total_signed_up: string;
    referrals: Referral[];
  };
}

export interface Referral {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  referral_date: string;
}

export interface IGetTransactionsResponse {
  message: string;
  status: boolean;
  data: Transaction[];
}

export interface Transaction {
  amount: string;
  date: string;
  id: number;
  status: string;
  transaction_id: number;
  type: string;
}
