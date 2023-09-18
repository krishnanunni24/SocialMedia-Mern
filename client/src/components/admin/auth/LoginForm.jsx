import React from "react";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function LoginForm(props) {
  const auth = useSelector((state) => state.authReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(props.onSubmit)}
      className="space-y-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7"
    >
      <div className="relative">
        <input
          autoComplete="off"
          id="email"
          name="email"
          type="text"
          className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
          placeholder="Email address"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Email must be Valid!",
            },
          })}
        />
        {errors.email && (
          <p className="text-xs italic text-red-500">{errors.email.message}</p>
        )}

        <label
          htmlFor="email"
          className="peer-placeholder-shown:text-gray-440 absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
        >
          Email Address
        </label>
      </div>
      <div className="relative">
        <input
          autoComplete="off"
          id="password"
          name="password"
          type="password"
          className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-xs italic text-red-500">
            {errors.password.message}
          </p>
        )}
        {auth.error && (
          <p className="mt-2 block text-sm text-red-500">
            *Incorrect Email or Password
          </p>
        )}
        <label
          htmlFor="password"
          className="peer-placeholder-shown:text-gray-440 absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
        >
          Password
        </label>
      </div>
      <div className="relative flex justify-center">
        <button
          type="submit"
          className="rounded-lg bg-purple-600 px-2 py-1 text-white hover:bg-purple-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-purple-700 "
        >
          Sign In
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
