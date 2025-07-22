import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button, Password } from "rizzui";
import { showerror } from "@/utils/showPopup";

const NewPassword = ({ callback }: { callback: () => void }) => {
  const schema = yup
    .object({
      password: yup.string().required("Password is required"),
      new_password: yup.string().required("Password is required"),
    })
    .required();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm: SubmitHandler<Record<string, string>> = async (data) => {
    const { email, password } = data;
    try {
      callback();
    } catch (error: any) {
      console.log(error);
      showerror(`${error.message}`);
    }
  };

  return (
    <>
      <div className=" w-full">
        <h1 className="text-heading-1-bold mb-2 smd:text-heading-2-bold sm:text-heading-4-bold">
          New Password
        </h1>
        <h2 className="text-base-regular sm:text-small-regular text-[#687076]">
          Set the new password for your account so you can login and access all
          features.
        </h2>
        <form
          className="space-y-4 my-4 w-full"
          onSubmit={handleSubmit(handleForm)}
        >
          <Password
            label="Password"
            placeholder="Enter your password"
            inputClassName={`${errors.password && "border-2 border-red-500"}`}
            {...register("password")}
            error={errors.password?.message}
            errorClassName="text-red-500"
          />
          <Password
            label="Confirm Password"
            placeholder="Enter new password again"
            inputClassName={`${
              errors.new_password && "border-2 border-red-500"
            }`}
            {...register("new_password")}
            error={errors.new_password?.message}
            errorClassName="text-red-500"
          />
          <Button
            rounded="lg"
            type="submit"
            className="w-full text-white  !text-base-bold !bg-primary"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Continue
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewPassword;
