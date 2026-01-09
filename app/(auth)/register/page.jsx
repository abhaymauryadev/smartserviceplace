"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoLogoApple } from "react-icons/io5";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState("user");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleToggle = () => {
    const newRole = role === "user" ? "provider" : "user";
    setRole(newRole);
    setForm({ ...form, role: newRole });
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      router.push("/login");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex h-screen w-full bg-white text-black ">
      {/* Left side image */}
      <div className="relative flex w-1/2 h-full ">
        <Image
          src="/assets/Sign-up-image.png"
          alt="Login illustration"
          width={800}
          height={500}
          priority
          className="fill"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-t from-black/80 to-transparent text-white pt-96">
          <div className="flex flex-col max-w-xl m-auto">
            <h1 className="font-bold lg:text-4xl">
              Join our community of <br />
              experts and clients.
            </h1>
            <p className="font-medium pt-4"> </p>

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
                <h1 className="text-[12px]">
                  "This platform transformed how I find local work. <br />
                  I'm booked weeks in advance "
                </h1>
                <p className="text-[12px] text-bold mt-2">
                  -Sarah Jenkins, Professional Cleaner
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex flex-col justify-center w-1/2 px-48">
        <h1 className="text-4xl font-bold mb-2">Create Account</h1>
        <p className="text-sm mb-8">
          Get Started booking Services or offering your skills to the
          neighborhood
        </p>

        <div className="flex flex-col  ">
          <label className="font-semibold text-gray-700">I want to...</label>
          <div className="w-full border mb-3 mt-3">
          <div
            onClick={handleToggle}
            className={`relative w-full h-10 flex items-center justify-between  cursor-pointer transition-colors ${
              role === "user" ? "bg-blue-500" : "bg-green-500"
            }`}
          >
            <div
              className={`absolute w-24 h-10 bg-white  flex items-center justify-between shadow-md transform transition-transform ${
                role === "user" ? "translate-x-0" : "translate-x-24"
              }`}
            />
            <span
              className={`w-24 text-center z-10 text-sm font-medium ${
                role === "user" ? "text-blue-700" : "text-white"
              }`}
            >
              User
            </span>
            <span
              className={`w-24 text-center z-10 text-sm font-medium ${
                role === "provider" ? "text-green-700" : "text-white"
              }`}
            >
              Provider
            </span>
          </div>
        </div>
        </div>

        {error && <p className="mb-3 text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="underline">
            Login
          </a>
        </p>

        <button
          onClick={() => handleOAuthLogin("google")}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
        >
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
          Continue with Google
        </button>

        <button
          onClick={() => handleOAuthLogin("Apple")}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <IoLogoApple />
          Continue with Apple
        </button>
      </div>
    </section>
  );
}

/*
 <>
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>

     
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <select
          className="w-full border p-2 rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="provider">Service Provider</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-sm mt-4">
        Already have an account?{" "}
        <a href="/login" className="underline">
          Login
        </a>
      </p>

      <button
        onClick={() => handleOAuthLogin("google")}
        className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
      >
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
        Continue with Google
      </button>

      <button
        onClick={() => handleOAuthLogin("Apple")}
        className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        
      <IoLogoApple />
        Continue with Apple
      </button>
    </>
 */
