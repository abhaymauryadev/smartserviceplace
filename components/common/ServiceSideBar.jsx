"use client"
import React, { useState } from 'react'

export default function ServiceSideBar() {
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
    <aside className="w-64 h-screen border-r border-gray-200 bg-white text-gray-800 p-4">
      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Filter by Category</h2>
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
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2 accent-blue-600"
              />
              <span className="cursor-pointer">{category}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Filter by Price</h2>
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
  )
}