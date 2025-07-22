// lib/errorHandler.ts
export const handleApiError = (error: any) => {
  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
  } else {
    throw new Error(error.message || "An unknown error occurred");
  }
};
