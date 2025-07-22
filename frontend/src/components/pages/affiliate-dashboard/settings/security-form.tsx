import { useUpdateSecuritySettingsMutation } from "@/api/affiliate";
import { useProfileQuery } from "@/api/user";
import SpaceBetween from "@/components/common/SpaceBetween";
import useAuthStore from "@/zustand/authStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Password, Switch } from "rizzui";
import { toast } from "sonner";
import * as yup from "yup";
interface FormData {
  two_factor_enabled?: boolean;
  password?: string;
  password_confirmation?: string;
}

const SecurityForm = () => {
  const { data } = useProfileQuery();
  const profileDetail = data?.data;

  const securityOptions = [
    {
      title: "Set 2 Factor Authentification",
      value: "2fa",
    },
  ];
  const schema = yup
    .object({
      two_factor_enabled: yup.boolean(),
      password: yup.string(),
      password_confirmation: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match"),
    })
    .required();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (profileDetail) {
      reset({
        two_factor_enabled: profileDetail.two_factor_enabled,
        password: "",
        password_confirmation: "",
      });
    }
  }, [profileDetail, reset]);

  const {
    userData: { user_id },
  } = useAuthStore();
  const { mutateAsync, isPending } = useUpdateSecuritySettingsMutation(
    user_id as string
  );

  const handleForm: SubmitHandler<FormData> = async (data) => {
    const formdata = new FormData();

    formdata.append("two_factor_enabled", data.two_factor_enabled ? "1" : "0");
    formdata.append("password", data.password as string);
    formdata.append(
      "password_confirmation",
      data.password_confirmation as string
    );
    await mutateAsync(data as any).then(() =>
      toast.success("Settings Updated")
    );
    reset({
      two_factor_enabled: profileDetail?.two_factor_enabled || false,
      password: "",
      password_confirmation: "",
    });
  };

  return (
    <div className="md:p-0 p-4 rounded-lg bg-white">
      <p className="text-[18px] text-[#333333] mb-4">Security Settings</p>

      <form onSubmit={handleSubmit(handleForm)}>
        <div className="flex flex-col gap-4 lg:max-w-full max-w-[38em]">
          {securityOptions.map((e) => (
            <SpaceBetween className="gap-8 py-8 border-b" key={e.value}>
              <p className="text-[#212121] mb-2">{e.title}</p>

              <Controller
                control={control}
                name="two_factor_enabled"
                render={({ field }) => (
                  <Switch
                    switchKnobClassName="bg-white"
                    switchClassName={`${
                      field.value ? "bg-blue-500" : "bg-gray-400"
                    }`}
                    checked={field.value}
                    onChange={(checked) => {
                      field.onChange(checked);
                    }}
                  />
                )}
              />
            </SpaceBetween>
          ))}
          <Password
            size="lg"
            label="New Password"
            placeholder="Enter new password"
            inputClassName={`${errors.password && "border-2 border-red-500"}`}
            {...register("password")}
            error={errors.password?.message}
            errorClassName="text-red-500"
          />
          <Password
            size="lg"
            label="Confirm Password"
            placeholder="Enter new password again"
            inputClassName={`${
              errors.password_confirmation && "border-2 border-red-500"
            }`}
            {...register("password_confirmation")}
            error={errors.password_confirmation?.message}
            errorClassName="text-red-500"
          />
        </div>
        <Button
          size="lg"
          disabled={isSubmitting || isPending}
          className="bg-main mt-3 text-white"
          type="submit"
        >
          {isPending ? "Updating..." : "Update"}
        </Button>
      </form>
    </div>
  );
};

export default SecurityForm;
