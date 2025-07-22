import React, { useState } from "react";
import { informationCircleOutline, cardOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import { Button, Loader } from "rizzui";

type CardDetails = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

type InputPaymentDetailsModalProps = {
  onClose: () => void;
  onPay: (cardDetails: CardDetails) => void;
  loading: boolean; // New prop
};

const validationSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),
  expiryDate: yup
    .string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be MM/YY"),
  cvv: yup
    .string()
    .required("CVV is required")
    .matches(/^\d{3}$/, "CVV must be 3 digits"),
});

const InputPaymentDetailsModal: React.FC<InputPaymentDetailsModalProps> = ({
  onClose,
  onPay,
  loading,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CardDetails>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: CardDetails) => {
    onPay(data);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-[400px] flex flex-col gap-[25.6px]"
      >
        <div className="flex flex-col gap-4">
          <div className="size-[38.4px] bg-[#F7DFDE] border-[6px] border-[#F9F5FF] rounded-full flex items-center justify-center">
            <IonIcon icon={cardOutline} className="size-5 text-[#E02014]" />
          </div>

          <div className="flex flex-col gap-[6.4px]">
            <p className="text-sm text-[#101828]">Input Payment details</p>
            <p className="text-xs text-[#667085]">
              Input your card details below.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Controller
              name="cardNumber"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <label htmlFor="cardNumber" className="flex flex-col gap-1">
                    <span className="text-xs text-[#344054]">Card Number</span>
                    <input
                      {...field}
                      id="cardNumber"
                      inputMode="numeric" // Optimizes keyboard for numeric input on mobile
                      pattern="\d*" // Ensures only digits are allowed
                      onChange={(e) => {
                        const sanitizedValue = e.target.value.replace(
                          /\D/g,
                          ""
                        );
                        field.onChange(sanitizedValue);
                      }}
                      maxLength={16}
                      className="p-2 border border-[#D0D5DD] rounded-md text-xs"
                    />
                  </label>
                  {errors.cardNumber && (
                    <span className="text-xs text-red-500">
                      {errors.cardNumber.message}
                    </span>
                  )}
                </div>
              )}
            />

            <div className="flex gap-3">
              <Controller
                name="expiryDate"
                control={control}
                render={({ field }) => (
                  <div className="w-full flex flex-col gap-1">
                    <label htmlFor="expiryDate" className="flex flex-col gap-1">
                      <span className="text-xs text-[#344054]">Expiry</span>
                    </label>
                    <InputMask
                      {...field}
                      mask="99/99"
                      maskPlaceholder="MM/YY"
                      className="p-2 border border-[#D0D5DD] rounded-md text-xs"
                    />
                    {errors.expiryDate && (
                      <span className="text-xs text-red-500">
                        {errors.expiryDate.message}
                      </span>
                    )}
                  </div>
                )}
              />

              <Controller
                name="cvv"
                control={control}
                render={({ field }) => (
                  <div className="w-full flex flex-col gap-1">
                    <label htmlFor="cvv" className="flex flex-col gap-1">
                      <span className="text-xs text-[#344054]">CVV</span>
                      <input
                        {...field}
                        type="password"
                        id="cvv"
                        maxLength={3}
                        className="p-2 border border-[#D0D5DD] rounded-md text-xs"
                      />
                    </label>
                    {errors.cvv && (
                      <span className="text-xs text-red-500">
                        {errors.cvv.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        <div className="bg-[#FEFCE8] border border-[#FDE047] p-4 rounded flex gap-2">
          <div>
            <IonIcon
              icon={informationCircleOutline}
              className="size-5 text-[#854D0E] border-[#854D0E]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm text-[#854D0E] font-semibold">Please Note</p>
            <p className="text-xs text-[#A16207]">
              Azany inc. does not keep your payment details. All details are
              kept securely with Authorize.net
            </p>
          </div>
        </div>

        <div className="w-full flex gap-[10px]">
          <button
            onClick={onClose}
            className="w-full bg-transparent border border-[#D0D5DD] px-6 py-2 rounded-md text-xs text-[#344054]"
          >
            Cancel
          </button>
          <Button
            type="submit"
            className="w-full bg-[#E02014] text-white px-6 py-2 rounded-md text-xs"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                Processing
                <Loader variant="threeDot" />
              </div>
            ) : (
              " Pay now"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InputPaymentDetailsModal;
