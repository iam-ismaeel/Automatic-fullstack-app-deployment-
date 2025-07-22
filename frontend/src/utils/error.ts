import { showerror } from "./showPopup";

const ProcessError = (error: any) => {
  const err = error?.response?.data?.errors as any[];
  if (error?.response?.data?.error) {
    showerror(error?.response?.data?.error);
    return;
  }
  if (error?.response?.data?.message) {
    showerror(error?.response?.data?.message);
    return;
  }
  if (err) {
    err.map((err: any) => showerror(err.message));
    return;
  } else if (error?.message) {
    showerror(error?.message || `An error occurred`);
    return;
  }

  if (error.response && error.response.status === 401) {
    return "Unauthorized, redirecting to sign in...";
  }
  if (error?.response?.status === 422) {
    error?.message("incomplete or incorrect details");
    return "incomplete or incorrect details";
  } else if (error?.response?.status >= 500) {
    return "We could not connect to the server";
  } else {
    return "An Error Occurred";
  }
};

export default ProcessError;
