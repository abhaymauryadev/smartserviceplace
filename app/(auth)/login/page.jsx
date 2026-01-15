"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoLogoApple } from "react-icons/io5";
import { Mail, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  }

  const handleOAuthLogin = async (provider) => {
    setError("");
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <section className="flex  h-screen w-full bg-white text-black ">
      {/* Left side image */}
      <div className="relative flex hidden  md:flex md:w-1/2 h-full ">
        <Image
          src="/assets/Login-image.png"
          alt="Login illustration"
          width={800}
          height={500}
          priority
          className="fill"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-t from-blue-500/80 to-transparent text-white pt-96">
          <div className="flex flex-col max-w-xl m-auto">
            <h1 className="font-bold lg:text-4xl">
              Expert the Local Services, <br />
              Delivered to your <br /> Door.
            </h1>
            <p className="font-medium pt-4">
              {" "}
              Join thousands of homeowners connecting daily with top-rated
              professionals for repairs, cleaning, and <br /> maintenance.
            </p>

            <div className="rounded-2xl mt-2 bg-white/20 w-100 h-20 flex gap-3 justify-center items-center">
              <Image
                src="/assets/user_group.png"
                alt="user group"
                width={80}
                height={80}
                priority
                className="fill"
              />
              <div className="flex flex-col ">
                <h1 className="text-[17px]">Trusted by professionals</h1>
                <p className="text-[12px]">
                  Verified by thousands of professionals worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex flex-col justify-center w-full md:w-1/2 p-8 md:px-12 lg:px-24 xl:px-32 2xl:px-48 min-h-screen">
        <h1 className="text-3xl md:text-4xl  font-bold mb-2">Welcome Back!</h1>
        <p className="text-sm mb-8">Please enter your details to sign in.</p>

        {error && <p className="mb-3 text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-gray-700">
              Email Address
            </label>
            <div className="flex items-center border border-gray-400  rounded p-2 w-full">
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="flex-1 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="text-gray-500 ml-2" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-gray-700">
              Password
            </label>
            <div className="flex items-center border border-gray-400 rounded p-2 w-full">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="flex-1 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <EyeOff
                  className="text-gray-500 ml-2 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="text-gray-500 ml-2 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging..." : "Login"}
          </button>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-blue-600"
              />
              Remember Me
            </label>

            {/* Forgot Password link */}
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-400 "></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white  text-gray-500  font-medium">
              Or continue with
            </span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="flex space-x-3 ">
          <button
            onClick={() => handleOAuthLogin("google")}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border-2 border-gray-400 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {/* Google Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>

          <button
            onClick={() => handleOAuthLogin("apple")}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border-2 border-gray-400 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <IoLogoApple className="" size={23} />
            Apple
          </button>
        </div>

        <p className="text-sm mt-8 text-center ">
          Don’t have an account?{" "}
          <a href="/register" className="text-bold text-blue-500">
            Sign up for free
          </a>
        </p>
      </div>
    </section>
  );
}
