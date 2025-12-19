"use client";

import { useState } from "react";

export default function ServiceForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        placeholder="Service title"
        className="border p-2 w-full rounded"
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 w-full rounded"
        onChange={handleChange}
        required
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        className="border p-2 w-full rounded"
        onChange={handleChange}
        required
      />

      <button className="bg-black text-white px-4 py-2 rounded">
        Save Service
      </button>
    </form>
  );
}
