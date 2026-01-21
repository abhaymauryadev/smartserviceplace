import React, { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export default function ServiceSideBar({ isOpen, onClose }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const categories = [
    'All',
    'Cleaning',
    'Plumbing',
    'Electrical',
    'Painting',
    'Carpentry',
    'Gardening',
    'Beauty',
    'Other',
  ]

  // Initialize state from URL
  const [selectedCategories, setSelectedCategories] = useState(['All'])
  const [maxPrice, setMaxPrice] = useState(1000)

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const priceParam = searchParams.get('maxPrice')

    if (categoryParam) {
      setSelectedCategories(categoryParam.split(','))
    } else {
      setSelectedCategories(['All'])
    }

    if (priceParam) {
      setMaxPrice(Number(priceParam))
    }
  }, [searchParams])

  // Update URL function
  const updateURL = useCallback((newCategories, newPrice) => {
    const params = new URLSearchParams(searchParams.toString())

    if (newCategories.length > 0 && !newCategories.includes('All')) {
      params.set('category', newCategories.join(','))
    } else {
      params.delete('category')
    }

    if (newPrice < 1000) {
      params.set('maxPrice', newPrice.toString())
    } else {
      params.delete('maxPrice')
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [pathname, router, searchParams])

  const handleCategoryChange = (category) => {
    let updated
    if (category === 'All') {
      updated = ['All']
    } else {
      updated = selectedCategories.filter((c) => c !== 'All')
      if (updated.includes(category)) {
        updated = updated.filter((c) => c !== category)
      } else {
        updated.push(category)
      }
      if (updated.length === 0) {
        updated = ['All']
      }
    }
    setSelectedCategories(updated)
    updateURL(updated, maxPrice)
  }

  const handlePriceChange = (e) => {
    const value = Number(e.target.value)
    setMaxPrice(value)
  }

  // Debounce price change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (maxPrice !== Number(searchParams.get('maxPrice') || 1000)) {
        updateURL(selectedCategories, maxPrice)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [maxPrice, selectedCategories, updateURL, searchParams])

  const resetFilters = () => {
    setSelectedCategories(['All'])
    setMaxPrice(1000)
    router.push(pathname, { scroll: false })
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
            step="50"
            value={maxPrice}
            onChange={handlePriceChange}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>₹0</span>
            <span>₹{maxPrice}+</span>
          </div>
        </div>
      </aside>
    </>
  )
}
