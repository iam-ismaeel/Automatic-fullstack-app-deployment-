const data: {
  [key: string]: string;
} = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
  CHF: "CHF",
  CNY: "¥",
  SEK: "kr",
  NZD: "NZ$",
  MXN: "$",
  SGD: "S$",
  HKD: "HK$",
  NOK: "kr",
  KRW: "₩",
  RUB: "₽",
  INR: "₹",
  BRL: "R$",
  ZAR: "R",
  THB: "฿",
  NGN: "₦",
  JMD: "J$",
  AFN: "Af",
  ALL: "L",
  DZD: "د.ج",
  AOA: "Kz",
};
export const countryToCurrencyMap = (curr: string | number | null) => {
  if (!curr) {
    return "$";
  }

  if (curr in data) {
    return data[curr];
  }

  return "$";
};
