"use client";
import React, { Fragment, useState, useEffect } from "react";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ItemsInCheckout } from "@interfaces/checkout";
import useStore from "@/zustand/useStore";
import { IUserStore, useUserStore } from "@/zustand/userStore";
import {
  useFetchAllCartItemQuery,
  useGetProfileQuery,
} from "@/api/fetchAllCartItem";
import { Cart } from "@interfaces/cart";
import { useLocale } from "next-intl";
import { authorizeNetCheckOut, paystackCheckOut } from "@/api/client";
import { Profile } from "@interfaces/profile";
import { showerror, showsuccess } from "@/utils/showPopup";
import ShippingAddress from "./ShippingAddress";
import ShippingDetails from "./ShippingDetails";
import InputPaymentDetailsModal from "@/components/common/InputPaymentDetailsModal";

function CheckoutPageClient() {
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    number | null
  >(null);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const userStore = useStore<IUserStore, IUserStore>(
    useUserStore,
    (state: any) => state
  );
  const userId = userStore?.user?.user_id;
  const enabled = !!userId;

  const userCurrency = userStore?.user.data?.default_currency;
  const userCountryId = userStore?.user.data?.country_id;

  const { data: cartDetail, isLoading: iscartDetailLoading } =
    useFetchAllCartItemQuery(userId!, enabled);
  const { data: profileRes, isLoading: profLoad } = useGetProfileQuery();

  let profileFeed = profileRes?.data as Profile;
  let cartResponse = cartDetail?.data as Cart;

  const paymentMethods = [
    { name: "paystack", id: 3 },
    { name: "authorize.net", id: 5 },
  ];

  const schema = yup
    .object({
      email: yup
        .string()
        .email("Please enter a Valid e-mail")
        .required("Email is required"),
      first_name: yup.string().required("First Name is required"),
      last_name: yup.string().required("Last Name is required"),
      street_address: yup.string().required("Address is required"),
      state: yup.string().required("State is required"),
      city: yup.string().required("City is required"),
      zip: yup.string().optional(),
      phone: yup.string().required("Phone Number is required"),
    })
    .required();
  const localActive = useLocale();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm: SubmitHandler<any> = async (data: any) => {
    const grandCurrency = userCurrency!;

    let cartData: ItemsInCheckout[] = [];

    cartResponse.local_items?.forEach((one) => {
      let cartProduct: ItemsInCheckout = {
        product_id: one.product.id,
        product_quantity: one.quantity,
        total_amount: one.total_price,
      };
      cartData.push(cartProduct);
    });

    cartResponse.international_items?.forEach((one) => {
      let cartProduct: ItemsInCheckout = {
        product_id: one.product.id,
        product_quantity: one.quantity,
        total_amount: one.total_price,
      };
      cartData.push(cartProduct);
    });

    let shippingAddressData =
      selectedAddress !== 0
        ? profileFeed?.shipping_address?.find(
            (address) => address.id === selectedAddress
          )
        : data; // Use the form data when creating a new address

    const amount =
      cartResponse.total_local_price + cartResponse.total_international_price;
    const roundedAmount = Math.ceil(amount);

    let checkoutData = {
      user_id: userStore?.user.user_id!,
      email: userStore?.user.data?.email ?? data.email ?? profileFeed.email,
      amount: roundedAmount,
      payment_redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/${localActive}/payment-callback/paystack`,
      user_shipping_address_id: selectedAddress == 0 ? 0 : selectedAddress,
      shipping_address: shippingAddressData,
      items: cartData,
      payment_method: "paystack",
      currency: grandCurrency,
    };

    setLoading(true);
    try {
      const result = await paystackCheckOut(checkoutData);
      showsuccess("Order submitted successfully");
      window.location.href = result.data.url;
    } catch (error: any) {
      showerror(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleValidationAndSubmit = async () => {
    if (selectedAddress === 0) {
      const isValid = await trigger();
      if (!isValid) return;
    }

    const selectedMethod = paymentMethods.find(
      (method) => method.id === selectedPaymentMethod
    );

    if (selectedMethod?.name === "authorize.net") {
      setPaymentModalOpen(true);
    } else {
      const data = getValues();
      handleForm(data);
    }
  };

  const handlePay = async (cardDetails: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  }) => {
    const amount =
      cartResponse.total_local_price + cartResponse.total_international_price;

    const data = getValues();
    let shippingAddressData =
      selectedAddress !== 0
        ? profileFeed?.shipping_address?.find(
            (address) => address.id === selectedAddress
          )
        : data;

    // Use type guard to access properties safely
    let shippingDetails;
    if (shippingAddressData && "first_name" in shippingAddressData) {
      shippingDetails = {
        first_name: shippingAddressData.first_name,
        last_name: shippingAddressData.last_name,
        email: shippingAddressData.email,
        street_address: shippingAddressData.street_address,
        state: shippingAddressData.state,
        city: shippingAddressData.city,
        zip: shippingAddressData.zip,
        phone: shippingAddressData.phone,
      };
    } else {
      shippingDetails = {
        first_name: "john",
        last_name: "doe",
        email: "",
        street_address: shippingAddressData?.street_address,
        state: shippingAddressData?.state,
        city: shippingAddressData?.city,
        zip: "",
        phone: "",
      };
    }

    let cartData: {
      itemId: string;
      name: string;
      description: string;
      quantity: string;
      unitPrice: string;
    }[] = [];

    cartResponse.local_items?.forEach((item) => {
      let cartProduct = {
        itemId: item.product.id.toString(),
        name: item.product.name,
        description: "product description",
        quantity: item.quantity.toString(),
        unitPrice: item.product.price.toString(),
      };
      cartData.push(cartProduct);
    });
    cartResponse.international_items?.forEach((item) => {
      let cartProduct = {
        itemId: item.product.id.toString(),
        name: item.product.name,
        description: "product description",
        quantity: item.quantity.toString(),
        unitPrice: item.product.price.toString(),
      };
      cartData.push(cartProduct);
    });

    const checkOutData = {
      amount: amount.toString(),
      payment: {
        creditCard: {
          cardNumber: cardDetails.cardNumber,
          expirationDate: cardDetails.expiryDate,
          cardCode: cardDetails.cvv,
        },
      },
      billTo: {
        firstName: shippingDetails?.first_name,
        lastName: shippingDetails?.last_name,
        company: shippingDetails?.email,
        address: shippingDetails?.street_address,
        city: shippingDetails?.city,
        state: shippingDetails?.state,
        zip: "101223",
        country: shippingDetails?.city,
      },
      customer: {
        email: shippingDetails?.email,
      },
      lineItems: cartData,
    };

    setLoading(true);
    try {
      const result = await authorizeNetCheckOut(checkOutData);
      showsuccess(result.message);
      setPaymentModalOpen(false);
      window.location.href = `/${localActive}/payment-callback/authorize`;
    } catch (error: any) {
      showerror(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="flex justify-between items-center mb-[24px]">
        <h4 className="text-[24px] font-semibold text-[#1C1C1C] font-inter">
          Checkout
        </h4>
      </div>
      <div className="space-y-4">
        <div className="flex md:flex-col gap-[33px]">
          <ShippingAddress
            profileFeed={profileFeed}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            errors={errors}
            register={register}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            paymentMethods={paymentMethods}
            userCountryId={userCountryId}
            onPaymentMethodChange={setSelectedPaymentMethod}
          />

          <ShippingDetails
            cartResponse={cartResponse}
            isPending={loading}
            handleSubmit={handleValidationAndSubmit}
          />
        </div>
      </div>

      {isPaymentModalOpen && (
        <InputPaymentDetailsModal
          onClose={() => setPaymentModalOpen(false)}
          onPay={handlePay}
          loading={loading} // New prop
        />
      )}
    </Fragment>
  );
}

export default CheckoutPageClient;
