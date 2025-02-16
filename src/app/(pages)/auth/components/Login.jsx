"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../../ui/Input";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import Image from "next/image";
import Separator from "@ui/Separator";
import api from "@lib/api";

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

  const handleGoogleLogin = () => {
    router.push("/api/auth/google");
    console.log("click");
  };

  const onSubmit = async (data) => {
    const res = await axios.post("/api/auth/login", data);
    console.log("res: ", res);

    if (res?.status === 200) {
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
        <Image
          src="/logo-limudon.png"
          alt="avatar"
          width={72}
          height={72}
          priority
          className="self-center w-auto mb-6"
        />

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

        <Separator>או</Separator>

        <div /* GOOGLE ACCESS */
          className="flex items-center justify-center gap-2 border-0 border-red-500"
        >
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="h-fit w-full p-3 flex items-center justify-center gap-2 rounded-sm border border-s-200"
          >
            <p className="text-s-400">כניסה עם גוגל</p>
            <FcGoogle className="text-2xl" />
          </button>
        </div>

        <div /* SIGN UP */ className="flex items-center justify-center">
          <p className="">
            אין לך חשבון?
            <span
              onClick={() => router.push("/auth/signup")}
              className="text-p-600 mr-1.5 cursor-pointer"
            >
              הירשם
            </span>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
