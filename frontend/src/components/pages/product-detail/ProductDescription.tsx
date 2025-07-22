import React, { useEffect, useRef, useState } from "react";
import { Check, Dot, Message, Basket, Share, Heart, Cart2 } from "@icons";
import { ShareSocial } from "react-share-social";
import StarRating from "@/components/common/star-rating";
import { productHome } from "@interfaces/products";
import useStore from "@/zustand/useStore";
import { IUserStore, useUserStore } from "@/zustand/userStore";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { addCartItem } from "@interfaces/common";
import { useAddToCartMutation, useAddToWishList } from "@/api/user";
import "reactjs-popup/dist/index.css";
import { showerror, showsuccess } from "@/utils/showPopup";
import { Button } from "rizzui";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import { formatPrice } from "@/utils/formatPrice";
import { calculateDiscountPercentage } from "@/utils/calculateDiscountPercentage";
import { IonIcon } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";

function ProductDescription({
  productDetails,
}: {
  productDetails: productHome;
}) {
  // const format = useFormatter();
  let [quantity, setQuantity] = useState(1);

  const userStore = useStore<IUserStore, IUserStore>(
    useUserStore,
    (state: any) => state
  );

  const user = userStore?.user;
  const router = useRouter();
  const localActive = useLocale();

  const { mutateAsync: postCartItem, isPending: loadingPostingCartItem } =
    useAddToCartMutation();

  const { mutateAsync: addToWishList, isPending: loadingWishList } =
    useAddToWishList();

  const addProductToCart = async () => {
    if (!user || !user.is_logged_in) {
      const currentPath = window.location.pathname; // Get the current pat
      router.push(`/${localActive}/login?redirect=${currentPath}`);
      return;
    }
    const cart: addCartItem = {
      user_id: user.user_id,
      token: user.token,
      product_id: productDetails?.id!,
      quantity: quantity,
    };

    await postCartItem(cart);
    showsuccess(`Added ${productDetails?.name} to cart successfully`);
  };

  const handleWishList = async () => {
    try {
      if (!user?.user_id) {
        showerror("Login to add product to wishlist");
        return;
      }
      const res = await addToWishList({
        user_id: user.user_id,
        product_id: productDetails.id,
      });
      showsuccess(`Added ${productDetails?.name} to wish list successfully`);
    } catch (err) {}
  };

  return (
    <div className="">
      <div className="flex items-center gap-x-[2px] mb-1 ">
        <Check className="w-6 h-6" />
        <label className="text-[#00B517] text-base-regular">
          {productDetails?.current_stock_quantity ?? 0 > 0
            ? "In Stock"
            : "Out of Stock"}
        </label>
      </div>
      <h6 className="text-extra-large-bold md:text-heading-5-bold text-[#1C1C1C] mb-2">
        {productDetails?.name}
      </h6>
      <div className="flex items-center smd:flex-wrap smd:gap-y-3 gap-x-3 mb-6">
        <div className="flex items-center gap-x-2">
          <StarRating
            rating={productDetails?.average_rating}
            size="rating-sm"
          />
          <label className="text-[#FF9017] text-base-medium">
            {productDetails?.average_rating}
          </label>
        </div>
        <div className="flex items-center gap-x-[7px]">
          <Dot className="w-[6px] h-[6px]" />
          <div className="flex items-center gap-x-[9px]">
            <Message className="w-5 h-5" />
            <label className="text-base-regular text-[#787A80]">
              {productDetails?.total_reviews} reviews
            </label>
          </div>
        </div>
        <div className="flex items-center gap-x-[7px]">
          <Dot className="w-[6px] h-[6px]" />
          <div className="flex items-center gap-x-[9px]">
            <Basket className="w-5 h-5" />
            <label className="text-base-regular text-[#787A80]">
              {productDetails?.item_sold} sold
            </label>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <p className="line-through text-[#8B909AAB]">
          {countryToCurrencyMap(productDetails.currency)}
          {formatPrice(parseInt(productDetails?.product_price ?? 0))}
        </p>
      </div>
      <div className="gap-x-5 flex items-center mb-10 ">
        <h6 className="text-heading-2-medium smd:text-heading-5-medium">
          {countryToCurrencyMap(productDetails.currency)}
          {formatPrice(parseInt(productDetails?.price ?? 0))}
        </h6>
        <div className="bg-[#FF33331A] px-2 py-[2px] text-[#FF3333] rounded-full text-xs ">
          {calculateDiscountPercentage(
            productDetails?.price,
            productDetails?.discount_price
          )}
          %
        </div>
      </div>

      <div className="flex gap-2 smd:flex-wrap smd:gap-y-2 mt-5 mb-7">
        <div className="w-[90px] h-[48px] flex-shrink-0 border-[2px] border-primary-light rounded-md flex items-center justify-between p-1 py-2">
          <label className="flex-1  text-center flex items-center justify-center">
            {quantity}
          </label>
          <div className="flex flex-col w-5">
            <button
              className="  leading-none text-primary-light"
              onClick={() => {
                setQuantity((s) => {
                  if (s < Number(productDetails?.current_stock_quantity))
                    return s + 1;
                  return s;
                });
              }}
            >
              &#8963;
            </button>
            <button
              className="leading-none text-primary-light rotate-180"
              onClick={() => {
                setQuantity((s) => {
                  if (s > 1) return s - 1;
                  return s;
                });
              }}
            >
              &#8963;
            </button>
          </div>
        </div>
        <Button
          onClick={addProductToCart}
          isLoading={loadingPostingCartItem}
          disabled={loadingPostingCartItem}
          className="h-[48px] bg-primary-light text-white border flex items-center gap-x-1 py-3 px-5 rounded-md w-[160px] flex-shrink-0"
        >
          <Cart2 className="w-5 h-5 " style={{ fill: "white" }} />
          <label className="text-white text-base-bold cursor-pointer">
            Add to cart
          </label>
        </Button>
        <button
          className="btn btn-neutral text-[#F1F1F1]"
          onClick={handleWishList}
          disabled={loadingWishList}
        >
          {productDetails.is_in_wishlist ? (
            <IonIcon icon={heart} className="size-6 text-primary-light" />
          ) : (
            <IonIcon icon={heartOutline} className="size-6 text-slate-400" />
          )}
        </button>
        <ShareSocialContainer />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 ">
        {productDetails?.brand !== "" && (
          <div className="text-small-medium">
            <label className="text-[#7E7E7E]">Brand:</label>
            <label className="text-main pl-1">{productDetails?.brand}</label>
          </div>
        )}
        {productDetails?.product_sku !== "" && (
          <div className="text-small-medium">
            <label className="text-[#7E7E7E]">SKU:</label>
            <label className="text-main pl-1">
              {productDetails?.product_sku}
            </label>
          </div>
        )}
        {productDetails?.color !== "" && (
          <div className="text-small-medium">
            <label className="text-[#7E7E7E]">Color:</label>
            <label className="text-main pl-1">{productDetails?.color}</label>
          </div>
        )}
        {productDetails?.size !== "" && (
          <div className="text-small-medium">
            <label className="text-[#7E7E7E]">Size:</label>
            <label className="text-main pl-1">{productDetails?.size}</label>
          </div>
        )}
        {productDetails?.unit !== "" && (
          <div className="text-small-medium">
            <label className="text-[#7E7E7E]">Unit:</label>
            <label className="text-main pl-1">{productDetails?.unit}</label>
          </div>
        )}
        {productDetails?.current_stock_quantity !== "" && (
          <div className="text-small-medium">
            <label className="text-[#7E7E7E]">Stock:</label>
            <label className="text-main pl-1">
              {productDetails?.current_stock_quantity} Items In Stock
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

function ShareSocialContainer() {
  const [openshare, setopenshare] = useState(false);
  const modalRef = useRef<HTMLButtonElement | null>(null);
  const shareurl = window.location.href;

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef?.current?.contains(event.target as Node)
      ) {
        setopenshare(false); // Call the onClose function to dismiss modal
      }
    };

    // Attach the listener only if modal is open
    if (openshare) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup listener on unmount or when modal is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openshare, setopenshare]);

  return (
    <button ref={modalRef} className="btn btn-neutral text-[#F1F1F1] relative">
      <Share className="w-6 h-6" onClick={() => setopenshare((s) => !s)} />
      {openshare && (
        <div className="absolute bottom-12 right-0 w-max shadow-md">
          <ShareSocial
            url={shareurl}
            socialTypes={["facebook", "twitter", "reddit", "linkedin"]}
          />
        </div>
      )}
    </button>
  );
}

export default ProductDescription;
