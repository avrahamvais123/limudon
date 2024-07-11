"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../../ui/Input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const schema = yup
  .object({
    email: yup.string().email("יש להכניס אימייל תקני").required("זהו שדה חובה"),
    password: yup
      .string()
      .min(6, "הסיסמה חייבת להיות באורך של לפחות 6 תווים")
      .required("זהו שדה חובה"),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Logged in successfully");
      router.push("/");
    } else {
      console.error("Failed to log in");
    }
  };

  return (
    <>
      <form
        className="size-full p-4 bg-white border flex flex-col justify-center gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          name="אימייל"
          errors={errors.email}
          register={register("email")}
        />
        <Input
          name="סיסמה"
          errors={errors.password}
          register={register("password")}
        />
        <button
          className="h-fit w-full mt-4 px-4 py-3 rounded-md bg-p-600 text-p-50 self-center"
          type="submit"
        >
          כניסה
        </button>

        <div /* SEPARATE */
          className="h-[0.05rem] w-full my-4 relative bg-s-300"
        >
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-s-400 text-center">
            או
          </p>
        </div>

        <div /* GOOGLE ACCESS */
          className="flex items-center justify-center gap-2 border-0 border-red-500"
        >
          <button
            type="button"
            onClick={() => signIn("google")}
            className="h-fit w-full p-2 flex items-center gap-2 rounded-sm border border-s-200"
          >
            <p className="text-xl text-s-400">כניסה עם גוגל</p>
            <FcGoogle className="text-2xl" />
          </button>

          <button
            type="button"
            onClick={() => signIn("google")}
            className="h-fit w-full p-2 flex items-center gap-2 rounded-sm border border-s-200"
          >
            <p className="text-xl text-s-400">כניסה עם גוגל</p>
            <FcGoogle className="text-2xl" />
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
