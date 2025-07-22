"use client";

import SpaceBetween from "@/components/common/SpaceBetween";
import { appendFormData, convertFileToBlob } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Avatar, Button, Input } from "rizzui";

import * as yup from "yup";
import { useProfileQuery, useUpdateProfileMutation } from "@/api/user";
import Loader from "@/components/common/loader";
import EmptyData from "@/components/common/empty-data";
import SearchableDropDown from "@/components/common/searchable-dropdown";
import { useLocationOptions } from "@/hooks/useLocationOptions";
import { showsuccess } from "@/utils/showPopup";
const ProfileForm = () => {
  const schema = yup
    .object({
      first_name: yup.string().required("First name is required"),
      last_name: yup.string().required("Last name is required"),
      date_of_birth: yup.string().required("Date of birth is required"),
      country_id: yup.string().required("Nationality is required"),
      state_id: yup.string().required("City is required"),
      phone_number: yup.string().required("Phone number is required"),
    })
    .required();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [avatar, setAvatar] = useState<File | null>();

  const [isEdit, setIsEdit] = useState(true);
  const toggleEditMode = () => setIsEdit(!isEdit);

  const { countryOptions, setCountryCode, statesOptions } =
    useLocationOptions();

  const { data, isLoading } = useProfileQuery();
  const profileDetail = data?.data;

  const { mutateAsync: updateProfile, isPending: updatingProfile } =
    useUpdateProfileMutation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setAvatar(files![0]); // Update the avatar state with the selected file
  };

  const handleForm: SubmitHandler<any> = async (data) => {
    const formdata = new FormData();
    appendFormData(data, formdata);

    if (avatar) {
      formdata.append("image", avatar); // Append the selected image to FormData
    }

    await updateProfile(formdata).then(() => {
      showsuccess("Profile updated successfully");
    });
  };

  const nationalityId = watch("country_id");
  const cityId = watch("state_id");

  useEffect(() => {
    if (profileDetail) {
      setValue("phone_number", profileDetail.phone);
      setValue("state_id", profileDetail.state_id);
      setValue("date_of_birth", profileDetail.date_of_birth);
      setValue("first_name", `${profileDetail.first_name || ""} `);
      setValue("last_name", `${profileDetail.last_name || ""}`);
      if (profileDetail.country_id) {
        setCountryCode(profileDetail.country_id);
        setValue("country_id", profileDetail.country_id);
      }
    }
  }, [profileDetail, setValue, setCountryCode]);

  return (
    <div className="lg:p-0 p-4 flex justify-center rounded-lg bg-white mt-5">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {profileDetail ? (
            <form
              className="lg:max-w-full lg:w-full w-4/5 p-4 border rounded-lg pb-8"
              onSubmit={handleSubmit(handleForm)}
            >
              <div className="flex item-center justify-center gap-2 mb-8">
                <div>
                  <div className="text-center mb-4">
                    <Avatar
                      name={`${profileDetail?.first_name} ${profileDetail?.last_name}`}
                      src={
                        avatar
                          ? convertFileToBlob(avatar)
                          : `${profileDetail?.image}`
                      }
                      className="text-2xl text-white border font-bold object-cover overflow-hidden"
                      rounded="full"
                      customSize={75}
                    />
                  </div>

                  <input
                    ref={inputRef}
                    onChange={handleChange}
                    hidden
                    type="file"
                    accept=".png, .jpg, .jpeg"
                  />
                  <Button
                    onClick={() => inputRef?.current?.click()}
                    className="w-fit"
                    variant="outline"
                  >
                    Edit Picture
                  </Button>
                </div>
              </div>

              <SpaceBetween className="mb-2">
                <Button
                  onClick={toggleEditMode}
                  className="text-main"
                  variant="flat"
                >
                  {isEdit ? "Click to Edit" : "Cancel"}
                </Button>
              </SpaceBetween>

              <div className="md:px-0 px-1 grid sm:grid-cols-1 grid-cols-2 xs:grid-cols-1 md:gap-4 gap-6 w-full">
                <Input
                  label="First Name"
                  type="text"
                  placeholder="Enter first name"
                  inputClassName={`${
                    errors.first_name && "border-2 border-red-500"
                  }`}
                  {...register("first_name")}
                  error={errors.first_name?.message}
                  errorClassName="text-red-500"
                  disabled={isEdit}
                />
                <Input
                  label="Last Name"
                  type="text"
                  placeholder="Enter last name"
                  inputClassName={`${
                    errors.last_name && "border-2 border-red-500"
                  }`}
                  {...register("last_name")}
                  error={errors.last_name?.message}
                  errorClassName="text-red-500"
                  disabled={isEdit}
                />
                {/* Change to datepicker */}
                <Input
                  label="Date of Birth"
                  type="date"
                  placeholder="Select date of birth"
                  inputClassName={`${
                    errors.date_of_birth && "border-2 border-red-500"
                  }`}
                  {...register("date_of_birth")}
                  error={errors.date_of_birth?.message}
                  errorClassName="text-red-500"
                  disabled={isEdit}
                />
                <div>
                  <label className="text-[14px] font-medium">Country</label>

                  <SearchableDropDown
                    data={countryOptions}
                    defaultVal={nationalityId}
                    handleSelection={(e: any) => {
                      setValue("country_id", e?.id);
                      setCountryCode(e?.id);
                      clearErrors("country_id");
                    }}
                    placeholder="Search for a country"
                    disabled={isEdit}
                    clearSelection={true}
                    className={errors.country_id && "border-2 border-red-500"}
                  />
                  {errors.country_id?.message && (
                    <p className=" text-[13px] text-red-500 ">
                      {errors.country_id?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-[14px] font-medium">City</label>
                  <SearchableDropDown
                    data={statesOptions}
                    defaultVal={cityId}
                    handleSelection={(e: any) => {
                      setValue("state_id", e?.id);
                      clearErrors("state_id");
                    }}
                    placeholder="Search for a city"
                    disabled={isEdit}
                    clearSelection={true}
                    className={errors.state_id && "border-2 border-red-500"}
                  />
                  {errors.state_id?.message && (
                    <p className=" text-[13px] text-red-500 ">
                      {errors.state_id?.message}
                    </p>
                  )}
                </div>
                <Input
                  label="Phone Number"
                  type="number"
                  placeholder="Enter Phone Number"
                  inputClassName={`${
                    errors.phone_number && "border-2 border-red-500"
                  }`}
                  {...register("phone_number")}
                  error={errors.phone_number?.message}
                  errorClassName="text-red-500"
                  disabled={isEdit}
                />
              </div>
              <div className="text-center mt-6">
                <Button
                  isLoading={updatingProfile}
                  className="bg-main text-white xs:w-full w-2/6"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          ) : (
            <EmptyData />
          )}
        </>
      )}
    </div>
  );
};

export default ProfileForm;
