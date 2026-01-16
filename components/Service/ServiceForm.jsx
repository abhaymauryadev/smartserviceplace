"use client";

import { useState } from "react";
import { toast } from "react-toast";
import { useRouter } from "next/navigation";

export default function ServiceForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    image: "",
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: form.image,
          title: form.title,
          description: form.description,
          price: Number(form.price),
          category: form.category,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create service");
      }

      toast("Service created successfully!");
      router.refresh(); // refresh the page to show new service
    } catch (err) {
      toast(err.message);
    } finally {
      setLoading(false);
      setForm({ image: "", title: "", description: "", price: "", category: "" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label>Service Image</label>
      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />

      <label>Service Title</label>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />

      <label>Service Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />

      <label>Service Price</label>
      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />

      <label>Service Category</label>
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Service"}
      </button>
    </form>
  );
}