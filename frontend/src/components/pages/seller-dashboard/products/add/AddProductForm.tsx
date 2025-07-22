"use client";

import Flex from "@/components/common/Flex";
import { User } from "@/components/svg";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Input } from "rizzui";
import * as Yup from "yup";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { appendFormData, isMarkdownEmpty, mapFileList } from "@/utils";
import DocumentUploader from "@/components/common/document-uploader";
import { useEffect, useState } from "react";
import UploadedDocument from "@/components/common/uploaded-document";
import {
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetColorsQuery,
  useGetSizesQuery,
  useGetSubCategoriesQuery,
  useGetUnitsQuery,
  useSellerAddProductMutation,
  useSellerUpdateProductMutation,
} from "@/api/product";
import SearchableDropDown from "@/components/common/searchable-dropdown";
import { validationSchema } from "./validation";
import { CountryPayload, ICategory, IProduct } from "@/interfaces/products";
import useAuthStore from "@/zustand/authStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { showerror, showsuccess } from "@/utils/showPopup";

const AddProductForm = ({
  productDetail,
  onSubmitForm,
}: {
  productDetail?: IProduct;
  onSubmitForm?: (data: any) => Promise<void>;
}) => {
  const router = useRouter();
  const localActive = useLocale();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    clearErrors,
    getValues,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { userData } = useAuthStore();
  const { mutateAsync, isPending, isSuccess } = useSellerAddProductMutation();
  const { mutateAsync: updateproduct, isPending: updatingProduct } =
    useSellerUpdateProductMutation(
      `${productDetail?.id}` as string,
      `${userData?.data?.id}` as string
    );
  const { data, isLoading: fetchingCategories } = useGetCategoriesQuery();
  const { data: brandsData, isLoading: fetchingBrands } = useGetBrandsQuery();
  const { data: unitsData, isLoading: fetchingUnits } = useGetUnitsQuery();
  const { data: colorsData, isLoading: fetchingColors } = useGetColorsQuery();
  const { data: sizesData, isLoading: fetchingSizes } = useGetSizesQuery();
  const [clearSelection, setClearSelection] = useState(false);

  const categoryId = watch("category.category_id");
  const subCategoryId = watch("category.sub_category_id");
  const brandId = watch("brand_id");
  const colorId = watch("color_id");
  const sizeId = watch("size_id");
  const unitId = watch("unit_id");
  const description = watch("description");
  const {
    data: subcatData,
    refetch,
    isLoading: fetchingSubCategories,
  } = useGetSubCategoriesQuery(categoryId);
  const categories = data?.data ?? [];
  const subCategoriesOptions = subcatData?.data ?? [];
  const brandsOptions = brandsData?.data ?? [];
  const colorOptions = colorsData?.data ?? [];
  const sizesOptions = sizesData?.data ?? [];
  const unitOptions = unitsData?.data ?? [];

  const handleForm = async (data: any) => {
    const formdata = new FormData();

    // Remove nested category structure
    const { category, ...rest } = data;

    // Append category-related fields directly
    formdata.append("category_id", category.category_id);
    if (category.sub_category_id) {
      formdata.append("sub_category_id", category.sub_category_id);
    }

    appendFormData(data, formdata);
    formdata.append("user_id", userData.user_id as string);
    if (!frontImage) {
      showerror("Please upload a thumbnail image");
      return;
    }
    formdata.append("front_image", frontImage![0]);
    if (files) {
      Array.from(files).forEach((file, index) => {
        formdata.append(`images[${index}]`, file);
      });
    } else {
      showerror("Please upload at least one additional thumbnail");
      return;
    }
    if (productDetail) {
      await updateproduct(formdata).then(() => {
        showsuccess("Product update successfully");
        reset();
        router.push(`/${localActive}/seller/products/${productDetail.id}`);
      });
    } else {
      await mutateAsync(formdata).then(() => {
        showsuccess("Product added successfully");
        reset();
      });
    }
  };

  const [files, setFiles] = useState<FileList | null>();
  const [frontImage, setFrontImage] = useState<FileList | null>();

  const fileNames = mapFileList(files as FileList, (file, index) => {
    return {
      name: file.name,
      index: index,
      size: file.size,
    };
  });

  const removeFileAtIndex = (index: number) => {
    if (!files) return;

    const dt = new DataTransfer();
    Array.from(files).forEach((file, i) => {
      if (i !== index) dt.items.add(file);
    });

    setFiles(dt.files);
  };

  useEffect(() => {
    if (categoryId) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  type FormValues = Yup.InferType<typeof validationSchema>;

  const keysToSet: (
    | keyof FormValues
    | `category.${keyof FormValues["category"]}`
  )[] = [
    "description",
    "current_stock_quantity",
    "minimum_order_quantity",
    "discount_price",
    "name",
    "product_price",
    "product_sku",
    "unit_id",
    "category.sub_category_id",
    "size_id",
    "color_id",
    "category.category_id",
    "brand_id",
  ];

  useEffect(() => {
    if (productDetail) {
      keysToSet.forEach((key) => {
        const [mainKey, subKey] = key.split(".");

        if (subKey && mainKey === "category") {
          // Specific handling for category
          if (subKey === "category_id" || subKey === "sub_category_id") {
            const categoryValue = productDetail.category?.[subKey];
            if (categoryValue) {
              setValue(key, categoryValue);
            }
          }
        } else {
          // Handle top-level keys, excluding complex types
          const value = productDetail[mainKey as keyof IProduct];
          if (
            value !== undefined &&
            typeof value !== "object" &&
            !Array.isArray(value)
          ) {
            setValue(key, value);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail]);

  // clear selection dropdown after success
  useEffect(() => {
    if (isSuccess) {
      setClearSelection(true);

      setTimeout(() => {
        // clear selection dropdown after 3 seconds
        setClearSelection(false);
      }, 3000);
    }
  }, [isSuccess]);

  const isFieldRequired = (fieldName: string) => {
    try {
      const field = Yup.reach(validationSchema, fieldName) as Yup.AnySchema;
      if (!field) return false;

      // Test the field with an empty value to see if it throws a validation error
      try {
        field.validateSync(undefined); // Pass `undefined` to simulate an empty value
        return false; // No error means the field is not required
      } catch (error: any) {
        // If the error message includes "required", the field is required
        return error.message.includes("required");
      }
    } catch (error) {
      return false; // Avoid errors if the field isn't found
    }
  };

  const LabelWithAsterisk = ({
    label,
    fieldName,
  }: {
    label: string;
    fieldName: keyof typeof validationSchema.fields;
  }) => (
    <label>
      {label}{" "}
      {isFieldRequired(fieldName) && <span style={{ color: "red" }}>*</span>}
    </label>
  );

  return (
    <div className="pb-16">
      <form onSubmit={handleSubmit(handleForm)}>
        <div
          style={{
            boxShadow: "0px 5px 10px rgba(51, 66, 87, 0.05)",
          }}
          className="p-6 rounded-[12px] bg-white"
        >
          <div className="flex-col flex gap-2 w-full">
            <Input
              label={
                <LabelWithAsterisk label="Product Name" fieldName="name" />
              }
              type="text"
              placeholder="Enter product name"
              inputClassName={`${errors.name && "border-2 border-red-500"}`}
              {...register("name")}
              error={errors.name?.message}
              errorClassName="text-red-500"
            />

            <div>
              <LabelWithAsterisk label="Description" fieldName="description" />
              <ReactQuill
                value={description}
                onChange={(val) => {
                  if (isMarkdownEmpty(val)) {
                    setValue("description", "");
                  } else {
                    setValue("description", val);

                    clearErrors("description");
                  }
                }}
                className={`rounded-md ${
                  errors.description && "border-2 border-red-500"
                }`}
              />
              {errors.description?.message && (
                <p className=" text-[13px] text-red-500 ">
                  {errors.description?.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            boxShadow: "0px 5px 10px rgba(51, 66, 87, 0.05)",
          }}
          className="p-6 mt-8 rounded-[12px] bg-white"
        >
          <Flex>
            <User />
            <p className="text-[#334257] font-semibold">General Information</p>
          </Flex>
          <div className="h-[1px] my-4 w-full border border-t"></div>
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 grid-cols-3 gap-4 ">
            <div>
              <p className="text-[14px] mb-1 font-medium"></p>
              <LabelWithAsterisk label="Category" fieldName="category" />

              <SearchableDropDown
                defaultVal={categoryId}
                handleSelection={(val) => {
                  setValue("category.category_id", val.id);
                  clearErrors("category.category_id");
                }}
                data={categories as ICategory[] & CountryPayload[]}
                loading={fetchingCategories}
                className={
                  errors.category?.category_id
                    ? "border-2 border-red-500"
                    : "border-slate-500 "
                }
                clearSelection={true}
              />
              {errors.category?.category_id?.message && (
                <p className=" text-[13px] text-red-500 ">
                  {errors.category?.category_id?.message}
                </p>
              )}
            </div>

            <div>
              <p className="text-[14px] mb-1 font-medium">Sub category</p>
              <SearchableDropDown
                defaultVal={subCategoryId}
                handleSelection={(val) => {
                  const idx = subCategoriesOptions.findIndex(
                    (c) => c.slug === val.slug
                  );
                  setValue(
                    "category.sub_category_id",
                    idx ? `${idx + 1}` : `${0}`
                  );
                  clearErrors("category.sub_category_id");
                }}
                data={subCategoriesOptions as ICategory[] & CountryPayload[]}
                loading={fetchingSubCategories}
                className={
                  errors.category?.sub_category_id
                    ? "border-2 border-red-500"
                    : "border-slate-500 "
                }
                clearSelection={true}
              />
              {errors.category?.sub_category_id?.message && (
                <p className=" text-[13px] text-red-500 ">
                  {errors.category?.sub_category_id?.message}
                </p>
              )}
            </div>

            <div>
              <p className="text-[14px] mb-1 font-medium">Brand</p>
              <SearchableDropDown
                defaultVal={brandId}
                handleSelection={(val) => {
                  setValue("brand_id", val.id);
                  clearErrors("brand_id");
                }}
                data={brandsOptions as ICategory[] & CountryPayload[]}
                loading={fetchingBrands}
                className={
                  errors.brand_id
                    ? "border-2 border-red-500"
                    : "border-slate-500 "
                }
                clearSelection={true}
              />
              {errors.brand_id?.message && (
                <p className=" text-[13px] text-red-500 ">
                  {errors.brand_id?.message}
                </p>
              )}
            </div>
            <div>
              <p className="text-[14px] mb-1 font-medium">Color</p>
              <SearchableDropDown
                defaultVal={colorId}
                handleSelection={(val) => {
                  setValue("color_id", val.id);
                  clearErrors("color_id");
                }}
                data={colorOptions as ICategory[] & CountryPayload[]}
                loading={fetchingColors}
                className={
                  errors.color_id
                    ? "border-2 border-red-500"
                    : "border-slate-500 "
                }
                clearSelection={true}
              />
              {errors.color_id?.message && (
                <p className=" text-[13px] text-red-500 ">
                  {errors.color_id?.message}
                </p>
              )}
            </div>
            <div>
              <p className="text-[14px] mb-1 font-medium">Unit</p>
              <SearchableDropDown
                defaultVal={unitId}
                handleSelection={(val) => {
                  setValue("unit_id", val.id);
                  clearErrors("unit_id");
                }}
                data={unitOptions as ICategory[] & CountryPayload[]}
                loading={fetchingUnits}
                className={
                  errors.unit_id
                    ? "border-2 border-red-500"
                    : "border-slate-500 "
                }
                clearSelection={true}
              />
              {errors.unit_id?.message && (
                <p className=" text-[13px] text-red-500 ">
                  {errors.unit_id?.message}
                </p>
              )}
            </div>
            <div>
              <p className="text-[14px] mb-1 font-medium">Size</p>
              <SearchableDropDown
                defaultVal={sizeId}
                clearSelection={true}
                handleSelection={(val) => {
                  setValue("size_id", val.id);
                }}
                data={sizesOptions as ICategory[] & CountryPayload[]}
                loading={fetchingSizes}
                className={
                  errors.size_id
                    ? "border-2 border-red-500"
                    : "border-slate-500 "
                }
              />
              {errors.size_id?.message && (
                <p className=" text-[13px] text-red-500 ">
                  {errors.size_id?.message}
                </p>
              )}
            </div>

            <Input
              label="SKU"
              type="text"
              placeholder="Enter SKU"
              inputClassName={`${
                errors.product_sku && "border-2 border-red-500"
              }`}
              {...register("product_sku")}
              error={errors.product_sku?.message}
              errorClassName="text-red-500"
            />
          </div>
        </div>
        <div
          style={{
            boxShadow: "0px 5px 10px rgba(51, 66, 87, 0.05)",
          }}
          className="p-6 mt-8 rounded-[12px] bg-white"
        >
          <Flex>
            <User />
            <p className="text-[#334257] font-semibold">Price Information</p>
          </Flex>
          <div className="h-[1px] my-4 w-full border border-t"></div>
          <div className="grid sm:grid-cols-1 xl:grid-cols-2 grid-cols-4 gap-4 ">
            <Input
              label={
                <LabelWithAsterisk label="Price" fieldName="product_price" />
              }
              placeholder="Enter price"
              inputClassName={`${
                errors.product_price && "border-2 border-red-500"
              }`}
              {...register("product_price")}
              error={errors.product_price?.message}
              errorClassName="text-red-500"
              type="number"
            />

            <Input
              label={
                <LabelWithAsterisk
                  label="Discount Price"
                  fieldName="discount_price"
                />
              }
              placeholder="Enter discount price (if any)"
              inputClassName={`${
                errors.discount_price && "border-2 border-red-500"
              }`}
              {...register("discount_price")}
              error={errors.discount_price?.message}
              errorClassName="text-red-500"
              type="number"
            />

            <Input
              label={
                <LabelWithAsterisk
                  label="Stock Quantity"
                  fieldName="current_stock_quantity"
                />
              }
              placeholder="Enter available stock"
              inputClassName={`${
                errors.current_stock_quantity && "border-2 border-red-500"
              }`}
              {...register("current_stock_quantity")}
              error={errors.current_stock_quantity?.message}
              errorClassName="text-red-500"
              type="number"
            />

            <Input
              label={
                <LabelWithAsterisk
                  label="Maximum Order Quantity"
                  fieldName="minimum_order_quantity"
                />
              }
              placeholder="Enter maximum order quantity"
              inputClassName={`${
                errors.minimum_order_quantity && "border-2 border-red-500"
              }`}
              {...register("minimum_order_quantity")}
              error={errors.minimum_order_quantity?.message}
              errorClassName="text-red-500"
              type="number"
            />
          </div>
        </div>
        <div className="mt-12 grid smd:grid-cols-1 grid-cols-2 gap-4">
          <div
            style={{
              boxShadow: "0px 5px 10px rgba(51, 66, 87, 0.05)",
            }}
            className="p-6 rounded-[12px] bg-white"
          >
            <p className="font-semibold text-[14px]">
              Thumbnail{" "}
              <span className="text-[#0D6EFD]">(Ratio 1:1 (500 x 500 px))</span>{" "}
              <span className="text-red-600">*</span>
            </p>
            <div className="grid gap-4 lg:grid-cols-1 grid-cols-[350px,1fr]">
              <DocumentUploader
                onSelectFile={(f) => setFrontImage(f)}
                maxFileSize={1 * 1024 * 1024}
              />
            </div>
          </div>
          <div
            style={{
              boxShadow: "0px 5px 10px rgba(51, 66, 87, 0.05)",
            }}
            className="p-6 rounded-[12px] bg-white"
          >
            <p className="font-semibold text-[14px]">
              Additional Thumbnail{" "}
              <span className="text-[#0D6EFD]">(Ratio 1:1 (500 x 500 px))</span>{" "}
              <span className="text-red-600">*</span>
            </p>
            <div className="grid gap-4 lg:grid-cols-1 grid-cols-[350px,1fr]">
              <DocumentUploader
                onSelectFile={(f) => {
                  setFiles((prevFiles) => {
                    if (prevFiles) {
                      const newFileList = new DataTransfer();
                      Array.from(prevFiles)
                        .concat(Array.from(f))
                        .forEach((file) => newFileList.items.add(file));
                      return newFileList.files;
                    }
                    return f;
                  });
                }}
                maxFileSize={1 * 1024 * 1024}
                allowMultiple
              />
            </div>
          </div>
        </div>
        {frontImage?.length ? (
          <div className="mt-6">
            <p>Thumbnail</p>
            <div className="grid slg:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 grid-cols-2 gap-2">
              <UploadedDocument
                className="h-fit"
                file={frontImage[0]}
                onDelete={() => setFrontImage(null)}
              />
            </div>
          </div>
        ) : null}
        {fileNames?.length ? (
          <div className="mt-6">
            <p>Additional Thumbnails</p>
            <div className="grid slg:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 grid-cols-2 gap-2">
              {fileNames?.map((file, i) => (
                <UploadedDocument
                  className="h-fit"
                  file={file}
                  key={i}
                  onDelete={() => {
                    removeFileAtIndex(i);
                  }}
                />
              ))}
            </div>
          </div>
        ) : null}
        <div className="py-4 md:ml-0 ml-[288px] pr-8 bg-white fixed bottom-0 left-0 right-0 flex justify-end gap-4 items-center">
          {!productDetail && (
            <Button
              onClick={() => {
                reset();
                setValue("description", "");
              }}
              size="lg"
              className="bg-black px-8 text-white"
            >
              Reset
            </Button>
          )}
          <Button
            isLoading={isPending}
            type="submit"
            size="lg"
            className="bg-main px-8 text-white"
          >
            {productDetail ? "Update" : " Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
