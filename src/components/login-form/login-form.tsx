"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import PasswordStrength from "./password-strength";

export default function LoginForm() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

    if (
      userName === "admin" &&
      emailAddress === "admin@gmail.com" &&
      passwordValue === "Admin@123"
    ) {
      router.push("/dashboard");
    } else {
      setErrorMessage("Invalid login credentials");
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

      <h1 className="text-4xl font-bold text-green-900">
        Welcome back
      </h1>

      <p className="mb-8 mt-2 text-sm text-gray-500">
        Sign in to continue to your account
      </p>

      <form onSubmit={handleLogin}>

        <label className="mb-2 block text-xs font-bold uppercase">
          Username
        </label>

        <input
          type="text"
          placeholder="Enter your username"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          className="mb-5 w-full rounded-lg bg-slate-900 p-3 text-white outline-none"
        />

        <label className="mb-2 block text-xs font-bold uppercase">
          Email Address
        </label>

        <input
          type="email"
          placeholder="you@gmail.com"
          value={emailAddress}
          onChange={(event) => setEmailAddress(event.target.value)}
          className="mb-5 w-full rounded-lg bg-slate-900 p-3 text-white outline-none"
        />

        <label className="mb-2 block text-xs font-bold uppercase">
          Password
        </label>

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.target.value)}
            className="w-full rounded-lg bg-slate-900 p-3 pr-12 text-white outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

        <PasswordStrength password={passwordValue} />

        {errorMessage && (
          <p className="mt-3 text-center text-red-500">
            {errorMessage}
          </p>
        )}

        <button
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 py-3 font-bold text-white transition hover:bg-emerald-600"
        >
          Sign In
          <ArrowRight size={18} />
        </button>

      </form>

      <div className="my-8 flex items-center">

        <div className="h-px flex-1 bg-gray-300"></div>

        <span className="mx-4 text-gray-400">
          OR
        </span>

        <div className="h-px flex-1 bg-gray-300"></div>

      </div>

      <p className="text-center text-sm text-gray-500">

        Don't have an account?{" "}

        <a
          href="#"
          className="font-semibold text-blue-600 hover:underline"
        >
          Create one
        </a>

      </p>

    </div>
  );
}