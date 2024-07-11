"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../../ui/Input";
import { useRouter } from "next/navigation";
import axios from "axios";

const schema = yup
  .object({
    username: yup.string().required("זהו שדה חובה"),
    email: yup.string().email("יש להכניס אימייל תקני").required("זהו שדה חובה"),
    password: yup
      .string()
      .min(6, "הסיסמה חייבת להיות באורך של לפחות 6 תווים")
      .required("זהו שדה חובה"),
  })
  .required();

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/auth/signup", data);

      if (res.status === 201) {
        router.push("/auth/login");
      } else {
        console.error("Failed to sign up");
      }
    } catch (error) {
      console.error(
        "Error signing up:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <form
      className="size-full p-4 bg-white border flex flex-col justify-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        name="שם"
        errors={errors.username}
        register={register("username")}
      />

      <Input name="אימייל" errors={errors.email} register={register("email")} />

      <Input
        name="סיסמה"
        errors={errors.password}
        register={register("password")}
      />
      <button
        className="h-fit w-full mt-4 px-4 py-3 rounded-md bg-p-600 text-p-50 self-center"
        type="submit"
      >
        שליחה
      </button>
    </form>
  );
};

export default Signup;
