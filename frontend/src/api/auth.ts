import { useMutation } from "@tanstack/react-query";
import authClient from "./client/auth";
import { ILoginPayload, IVerifyEmailPayload } from "@/interfaces/seller";
import ProcessError from "@/utils/error";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: ILoginPayload) => authClient.login(data),
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
      ProcessError(error);
    },
  });
};

export const useVerifyLoginMutation = () => {
  return useMutation({
    mutationFn: (data: IVerifyEmailPayload) => authClient.verifyLogin(data),
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
      ProcessError(error);
    },
  });
};

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: (data: IVerifyEmailPayload) => authClient.verifyEmail(data),
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
      ProcessError(error);
    },
  });
};

export const useResendCodeMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string }) => authClient.resendCode(data),
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
      ProcessError(error);
    },
  });
};
