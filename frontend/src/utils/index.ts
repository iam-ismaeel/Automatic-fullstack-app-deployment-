import { format, isDate } from "date-fns";
import { toast } from "sonner";
import { showinfo } from "./showPopup";

export function isMarkdownEmpty(value: string) {
  if (
    value.replace(/<(.|\n)*?>/g, "").trim().length === 0 &&
    !value.includes("<img")
  ) {
    return true;
  }
  return false;
}

export function mapFileList(
  fileList: FileList,
  mapFn: (file: File, index: number) => any
): any[] {
  if (!fileList) {
    return [];
  }
  return Array.from(fileList).map(mapFn);
}

export const convertFileToBlob = (e: File) => {
  const imageUrl = URL.createObjectURL(e);
  return imageUrl;
};

export function appendFormData(
  data: Record<string, any>,
  formData: any,
  rootKey = ""
): void {
  if (!(formData instanceof FormData)) {
    return;
  }

  Object.keys(data).forEach((key) => {
    const value = data[key];
    const formKey = rootKey ? `${rootKey}[${key}]` : key;

    if (value) {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          appendFormData(item, formData, `${formKey}[${index}]`);
        });
      } else if (value instanceof File || value instanceof Blob) {
        formData.append(formKey, value);
      } else if (isDate(value)) {
        formData.append(formKey, format(value, "yyyy-MM-dd"));
      } else if (
        value instanceof Object &&
        !(value instanceof File || value instanceof Blob)
      ) {
        appendFormData(value, formData, formKey);
      } else {
        formData.append(formKey, value);
      }
    }
  });
}

export const copyToClipboard = async (
  text: string,
  desc: string = "Text"
): Promise<boolean> => {
  if (!navigator.clipboard) {
    console.warn("Clipboard API not available");
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    showinfo(`${desc} copied to clipboard`);
    return true;
  } catch (err) {
    toast.error("Failed to copy text");
    console.warn(err);
    return false;
  }
};

export function truncateText(
  text: string,
  maxLength: number,
  ellipsis = "..."
) {
  if (text.length <= maxLength) {
    return text; // Return the original text if it's shorter than the max length
  }
  return text.slice(0, maxLength) + ellipsis; // Truncate and add ellipsis
}

export const getAvailablePaymentMethods = (countryId: number | string) => {
  // Define which payment methods are available for which countries
  const paymentMethodsByCountry: { [key: number | string]: string[] } = {
    30: ["paystack"], // Brazil
    231: ["authorize"], // United States
    230: ["authorize"], // United Kingdom
    160: ["paystack"], // Nigeria
    164: ["authorize"], // Norway
    108: ["paystack"], // Jamaica
    1: ["paystack"], // Afghanistan
    2: ["authorize"], // Albania
    3: ["paystack"], // Algeria
    6: ["paystack"], // Angola
    101: ["paystack"], // India
  };

  // Return the available payment methods for the given countryId
  return paymentMethodsByCountry[countryId] || [];
};

export const maskAccountNumber = (accountNumber: string) => {
  if (!accountNumber || accountNumber.length < 10) return accountNumber;

  const firstFour = accountNumber.slice(0, 2);
  const lastFour = accountNumber.slice(-4);
  const maskedMiddle = "*".repeat(accountNumber.length - 6);

  return `${firstFour}${maskedMiddle}${lastFour}`;
};

// Function to generate array of numbers in ascending order from a number. Input of 5 will output [1,2,3,4,5]
export function generatePageArray(totalPages: number) {
  const pageArray = [];
  for (let i = 1; i <= totalPages; i++) {
    pageArray.push(i);
  }
  return pageArray;
}

// Function to get visible pages for pagination component
export const getVisiblePages = (
  showFullPagination: boolean,
  currentPage: number,
  totalPages: number
) => {
  if (showFullPagination || totalPages <= 3) {
    return generatePageArray(totalPages);
  }

  const pages = [];
  if (currentPage > 2) {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
  }

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 1) {
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  if (currentPage === 1) {
    pages.unshift(1);
  }

  if (currentPage === totalPages) {
    pages.push(totalPages);
  }

  return pages;
};
