"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProfileForm({ initialUser, bookingCount }) {
    const [user, setUser] = useState(initialUser);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState("Personal Information");

    // Form state
    const [formData, setFormData] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        bio: user?.bio || "",
    });

    // Calculate member since
    const memberSince = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        })
        : "Unknown";

    // Profile completion
    const calculateCompletion = () => {
        const fields = ["name", "email", "phone", "bio"];
        const filledFields = fields.filter((field) => user?.[field]).length;
        return Math.round((filledFields / fields.length) * 100);
    };

    const completion = calculateCompletion();

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(null);
        setSuccess(false);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // Validation
        if (formData.name.trim().length < 2) {
            setError("Name must be at least 2 characters");
            return;
        }

        if (formData.bio.length > 500) {
            setError("Bio must be 500 characters or less");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/users", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to update profile");
            }

            // Update local user state
            setUser(data);
            setSuccess(true);
            setIsEditing(false);

            // Auto-hide success message
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error("Profile update error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Cancel editing
    const handleCancel = () => {
        setFormData({
            name: user?.name || "",
            phone: user?.phone || "",
            bio: user?.bio || "",
        });
        setIsEditing(false);
        setError(null);
        setSuccess(false);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-black">My Profile</h1>
                <button className="border text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">
                    Share Profile
                </button>
            </div>

            {/* Success Message */}
            {success && (
                <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
                    <p className="font-medium">Profile updated successfully!</p>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    <p className="font-medium">Error</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-black">
                {/* Left Sidebar */}
                <aside className="space-y-6">
                    {/* Profile Card */}
                    <div className="bg-white border rounded-xl p-5 text-center">
                        <div className="relative w-24 h-24 mx-auto mb-3">
                            <Image
                                src="/assets/images/placeholder.png"
                                alt="Avatar"
                                fill
                                className="rounded-full object-cover"
                            />
                            <span className="absolute bottom-0 right-0 bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-full text-xs">
                                ✎
                            </span>
                        </div>

                        <h3 className="font-semibold">{user?.name}</h3>
                        <p className="text-xs text-gray-500 mb-4">Member since {memberSince}</p>

                        <div className="grid grid-cols-3 gap-3 text-sm">
                            <div>
                                <p className="font-semibold">{bookingCount}</p>
                                <p className="text-gray-500 text-xs">Bookings</p>
                            </div>
                            <div>
                                <p className="font-semibold">-</p>
                                <p className="text-gray-500 text-xs">Rating</p>
                            </div>
                            <div>
                                <p className="font-semibold">-</p>
                                <p className="text-gray-500 text-xs">Reviews</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="bg-white border rounded-xl p-4 space-y-2 text-sm text-black">
                        {[
                            "Personal Information",
                            "Login & Security",
                            "Payments & Payouts",
                            "Preferences",
                        ].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${activeTab === tab
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-black"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Completion */}
                    <div className="bg-white border rounded-xl p-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span>Profile Completion</span>
                            <span className="font-medium">{completion}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${completion}%` }}
                            />
                        </div>

                        {!user?.phone && (
                            <div className="mt-4 bg-yellow-50 border border-yellow-100 rounded-lg p-3 text-xs">
                                <p className="font-medium mb-1">Add a phone number</p>
                                <p className="text-gray-600">
                                    Verify your phone to secure your account.
                                </p>
                            </div>
                        )}

                        {!user?.bio && (
                            <div className="mt-4 bg-yellow-50 border border-yellow-100 rounded-lg p-3 text-xs">
                                <p className="font-medium mb-1">Add a bio</p>
                                <p className="text-gray-600">
                                    Tell others about yourself.
                                </p>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Right Content */}
                <section className="lg:col-span-2 space-y-6">
                    {activeTab === "Personal Information" && (
                        <>
                            {/* Personal Info */}
                            <div className="bg-white border rounded-xl p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-semibold">Personal Information</h2>
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="text-blue-600 text-sm font-medium"
                                        >
                                            Edit
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleCancel}
                                                disabled={loading}
                                                className="text-gray-600 text-sm font-medium"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div className="md:col-span-2">
                                            <label className="text-gray-500 text-xs">Full Name</label>
                                            <input
                                                name="name"
                                                value={isEditing ? formData.name : user?.name || ""}
                                                onChange={handleChange}
                                                readOnly={!isEditing}
                                                className={`w-full border rounded-lg px-3 py-2 ${isEditing ? "bg-white" : "bg-gray-50"
                                                    }`}
                                            />
                                        </div>

                                        <div>
                                            <label className="text-gray-500 text-xs">Email Address</label>
                                            <input
                                                value={user?.email || ""}
                                                readOnly
                                                className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-gray-500 text-xs">Phone Number</label>
                                            <input
                                                name="phone"
                                                value={isEditing ? formData.phone : user?.phone || ""}
                                                onChange={handleChange}
                                                readOnly={!isEditing}
                                                placeholder="Add phone number"
                                                className={`w-full border rounded-lg px-3 py-2 ${isEditing ? "bg-white" : "bg-gray-50"
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="text-gray-500 text-xs">
                                            Bio ({isEditing ? formData.bio.length : user?.bio?.length || 0}/500)
                                        </label>
                                        <textarea
                                            name="bio"
                                            value={isEditing ? formData.bio : user?.bio || ""}
                                            onChange={handleChange}
                                            readOnly={!isEditing}
                                            rows={3}
                                            placeholder={isEditing ? "Tell us about yourself..." : "No bio added"}
                                            className={`w-full border rounded-lg p-3 text-sm ${isEditing ? "bg-white" : "bg-gray-50"
                                                }`}
                                        />
                                    </div>

                                    {isEditing && (
                                        <div className="text-right mt-4">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-400"
                                            >
                                                {loading ? "Saving..." : "Save Changes"}
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>

                            {/* Address - Static for now */}
                            <div className="bg-white border rounded-xl p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-semibold">Address</h2>
                                    <button className="text-blue-600 text-sm font-medium">+ Add New</button>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="border rounded-lg p-4 bg-gray-50">
                                        <p className="text-gray-500 text-center">
                                            No addresses added yet. Click "Add New" to add an address.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === "Login & Security" && (
                        <div className="bg-white border rounded-xl p-6">
                            <h2 className="font-semibold mb-4">Login & Security</h2>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center border-b pb-4">
                                    <div>
                                        <p className="font-medium">Password</p>
                                        <p className="text-gray-500 text-xs">Last updated 3 months ago</p>
                                    </div>
                                    <button className="text-blue-600 font-medium">Update</button>
                                </div>
                                <div className="flex justify-between items-center border-b pb-4">
                                    <div>
                                        <p className="font-medium">Social Accounts</p>
                                        <p className="text-gray-500 text-xs">Connected to Google</p>
                                    </div>
                                    <button className="text-blue-600 font-medium">Manage</button>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-red-600">Deactivate Account</p>
                                        <p className="text-gray-500 text-xs">Temporarily disable your account</p>
                                    </div>
                                    <button className="text-red-600 font-medium border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50">Deactivate</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "Payments & Payouts" && (
                        <div className="bg-white border rounded-xl p-6 text-center py-12">
                            <div className="text-gray-400 mb-4 text-4xl">💳</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment Methods</h3>
                            <p className="text-gray-500 mb-6">Add a payment method to make bookings easier.</p>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">Add Payment Method</button>
                        </div>
                    )}

                    {activeTab === "Preferences" && (
                        <div className="bg-white border rounded-xl p-6">
                            <h2 className="font-semibold mb-4">Notification Preferences</h2>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">Email Notifications</p>
                                        <p className="text-gray-500 text-xs">Receive booking updates via email</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">SMS Notifications</p>
                                        <p className="text-gray-500 text-xs">Receive booking updates via SMS</p>
                                    </div>
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
