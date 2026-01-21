"use client"
import React, { useState } from 'react'

export default function ServiceSideBar({ isOpen, onClose }) {
  const categories = [
    'All',
    'Cleaning',
    'Repair',
    'Painting',
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Gardening',
    'Pest Control',
    'Moving',
    'Other',
  ]

  const [selectedCategories, setSelectedCategories] = useState(['All'])

  const handleCategoryChange = (category) => {
    if (category === 'All') {
      // Reset to only "All"
      setSelectedCategories(['All'])
    } else {
      // Remove "All" if another category is selected
      let updated = selectedCategories.filter((c) => c !== 'All')

      if (updated.includes(category)) {
        updated = updated.filter((c) => c !== category)
      } else {
        updated.push(category)
      }

      // If none selected, default back to "All"
      if (updated.length === 0) {
        updated = ['All']
      }

      setSelectedCategories(updated)
    }
  }

  const resetFilters = () => {
    setSelectedCategories(['All'])
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 p-4 pt-10 transition-transform duration-300 ease-in-out transform 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:static lg:block`}
      >
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-xl font-bold text-black">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-black">Filter by Category</h2>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:underline"
            >
              Reset all
            </button>
          </div>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2 accent-blue-600"
                />
                <label
                  htmlFor={`category-${category}`}
                  className="cursor-pointer text-sm text-gray-700"
                >
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Filter */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-black">Filter by Price</h2>
          <input
            type="range"
            min="0"
            max="1000"
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>$0</span>
            <span>$1000</span>
          </div>
        </div>
      </aside>
    </>
  )
}
