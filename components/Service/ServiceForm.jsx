"use client";

import { useState } from "react";
import { toast } from "react-toast"; // assuming react-toast is installed from previous code
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, X } from "lucide-react";
import Image from "next/image";

export default function ServiceForm({ onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]); // Array of { file, preview }
  const [form, setForm] = useState({
    title: "",
    category: "",
    duration: 60,
    description: "",
    pricingModel: "fixed",
    price: "",
  });

  const categories = [
    "Cleaning",
    "Plumbing",
    "Electrical",
    "Painting",
    "Carpentry",
    "Gardening",
    "Beauty",
    "Other"
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      toast.error("Max 5 images allowed");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file), // Local preview
    }));

    setImages((prev) => [...prev, ...newImages]);
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url; // Returns /uploads/filename.ext
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Upload Images First
      const uploadedImageUrls = await Promise.all(
        images.map((img) => uploadFile(img.file))
      );

      // 2. Submit Service Data
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          duration: Number(form.duration),
          images: uploadedImageUrls,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create service");
      }

      toast.success("Service created successfully!");
      if (onClose) {
        onClose();
        router.refresh();
      } else {
        router.push("/dashboard/provider/services"); // Fallback
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => onClose ? onClose() : router.back()}
          className="flex items-center text-gray-500 hover:text-gray-700 text-sm"
        >
          <ArrowLeft size={16} className="mr-1" /> {onClose ? "Cancel" : "Back to Services"}
        </button>

        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        )}
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add New Service</h1>
        <p className="text-gray-500 text-sm mt-1">
          Create a new listing to start receiving bookings from local customers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-8">

        {/* Basic Information */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Professional Deep Cleaning"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Duration (Mins)</label>
                <div className="relative">
                  <input
                    type="number"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400 text-sm">mins</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Tell customers what's included in your service..."
                rows={4}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y"
                required
              />
            </div>
          </div>
        </section>

        {/* Pricing & Availability */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Pricing & Availability</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pricing Model</label>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden p-1 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, pricingModel: "fixed" }))}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition ${form.pricingModel === "fixed"
                    ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  Fixed Rate
                </button>
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, pricingModel: "hourly" }))}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition ${form.pricingModel === "hourly"
                    ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  Hourly
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rate (₹)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full pl-7 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>
          </div>
        </section>

        {/* Service Images */}
        <section className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold text-gray-900">Service Images</h2>
            <span className="text-xs text-gray-500">Max 5 images</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Upload Button */}
            {images.length < 5 && (
              <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition flex flex-col items-center justify-center p-4 aspect-square">
                <div className="bg-white p-2 rounded-full shadow-sm mb-2">
                  <Upload size={20} className="text-gray-400" />
                </div>
                <span className="text-xs font-medium text-gray-600 text-center">Upload Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}

            {/* Image Previews */}
            {images.map((img, index) => (
              <div key={index} className="relative border rounded-xl overflow-hidden aspect-square group">
                <Image
                  src={img.preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-white"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400">
            Supported formats: JPG, PNG, WEBP (Max 5MB each).
          </p>
        </section>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t font-medium">
          <button
            type="button"
            onClick={() => onClose ? onClose() : router.back()}
            className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm transition-all"
          >
            {loading ? "Saving..." : "Save Service Listing"}
          </button>
        </div>

      </form>
    </div>
  );
}