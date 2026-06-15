import React, { useContext, useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShopContext } from '../Context/ShopContext'
import { ProductGrid } from '../Components/ProductGrid'

const GENDER_TABS = [
  { label: 'Men', value: 'mens' },
  { label: 'Women', value: 'women' },
  { label: 'Shoes', value: 'shoes' },
]

const SUBCATEGORIES = {
  mens: ['Hoodies', 'Sweatshirts', 'T-Shirt', 'Shirts', 'Jackets'],
  women: ['Sets', 'Dress', 'Hoodies', 'Tops', 'Blouses', 'Sweatshirts', 'Shorts'],
  shoes: ['Heels', 'Sneakers', 'Slippers', 'Sandals', 'Clogs', 'Formal', 'Sports', 'Loafers', 'Boots'],
}

export const AllProducts = () => {
  const { all_product } = useContext(ShopContext)
  const [searchParams, setSearchParams] = useSearchParams()

  const genderFromUrl = searchParams.get('category') || 'mens'
  const [activeCategory, setActiveCategory] = useState(
    GENDER_TABS.find((t) => t.value === genderFromUrl)?.value || 'mens'
  )

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSize, setSelectedSize] = useState('All')
  const [selectedSort, setSelectedSort] = useState('default')
  const [selectedSubcategory, setSelectedSubcategory] = useState('All')
  const [activeDropdown, setActiveDropdown] = useState(null)

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setSelectedSize('All')
    setSelectedSubcategory('All')
    setSearchQuery('')
    setSearchParams({ category })
  }

  const categoryProducts = useMemo(
    () => all_product.filter((p) => p.category === activeCategory),
    [all_product, activeCategory]
  )

  const allSizes = ['All', 'S', 'M', 'L', 'XL', 'XXL']

  const sortOptions = [
    { label: 'Relevance', value: 'default' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
  ]

  const handleDropdownToggle = (name) => setActiveDropdown(activeDropdown === name ? null : name)
  const closeDropdowns = () => setActiveDropdown(null)

  const processedProducts = useMemo(() => {
    let result = [...categoryProducts]

    if (selectedSubcategory !== 'All') {
      result = result.filter((p) => p.subcategory === selectedSubcategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(q))
    }

    if (selectedSort === 'price-asc') result.sort((a, b) => a.new_price - b.new_price)
    else if (selectedSort === 'price-desc') result.sort((a, b) => b.new_price - a.new_price)

    return result
  }, [categoryProducts, searchQuery, selectedSort, selectedSubcategory])

  const hasActiveFilters = searchQuery !== '' || selectedSize !== 'All' || selectedSort !== 'default' || selectedSubcategory !== 'All'

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedSize('All')
    setSelectedSort('default')
    setSelectedSubcategory('All')
    setActiveDropdown(null)
  }

  const currentSubcategories = ['All', ...SUBCATEGORIES[activeCategory]]

  return (
    <div className="min-h-screen pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-8" onClick={closeDropdowns}>

      {/* Header */}
      <div className="mb-10">
        <span className="editorial-label text-gray-400 mb-2 block">Staples & Silhouettes</span>
        <h1 className="font-display text-3xl md:text-4xl text-black tracking-tight font-normal mb-2">
          The Apparel Catalog
        </h1>
        <p className="text-xs font-light text-gray-500">
          Showing {processedProducts.length} of {categoryProducts.length} designs.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b border-gray-100 mb-10 gap-0">
        {GENDER_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleCategoryChange(tab.value)}
            className={`relative px-8 py-3.5 font-sans text-xs uppercase tracking-widest transition-colors duration-200 ${
              activeCategory === tab.value ? 'text-black font-medium' : 'text-gray-400 hover:text-black'
            }`}
          >
            {tab.label}
            {activeCategory === tab.value && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black" />
            )}
          </button>
        ))}
      </div>

      {/* Subcategory Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {currentSubcategories.map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubcategory(sub)}
            className={`px-4 py-1.5 text-xs uppercase tracking-widest font-medium border transition-colors duration-200 ${
              selectedSubcategory === sub
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Filters Row */}
      <div
        className="border-t border-b border-gray-100 py-5 mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search */}
        <div className="relative max-w-sm w-full flex items-center border-b border-gray-100 hover:border-black transition-colors duration-300 py-1">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search silhouettes..."
            className="bg-transparent border-none outline-none font-sans text-xs tracking-wide w-full text-black placeholder:text-gray-300"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-black">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-sans">

          {/* Size */}
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle('size')}
              className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
                selectedSize !== 'All' ? 'border-black text-black font-medium' : 'border-gray-200 text-gray-600 hover:border-black'
              }`}
            >
              Size: {selectedSize}
              <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === 'size' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'size' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 mt-1.5 w-32 bg-white border border-gray-100 shadow-sm z-30 flex flex-col py-1"
                >
                  {allSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => { setSelectedSize(sz); closeDropdowns() }}
                      className={`text-left px-4 py-2.5 hover:bg-gray-50 transition-colors text-xs font-light ${
                        selectedSize === sz ? 'bg-gray-50 text-black font-normal' : 'text-gray-600'
                      }`}
                    >
                      {sz === 'All' ? 'All Sizes' : sz}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle('sort')}
              className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
                selectedSort !== 'default' ? 'border-black text-black font-medium' : 'border-gray-200 text-gray-600 hover:border-black'
              }`}
            >
              Sort: {sortOptions.find((o) => o.value === selectedSort)?.label}
              <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === 'sort' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'sort' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 mt-1.5 w-48 bg-white border border-gray-100 shadow-sm z-30 flex flex-col py-1"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSelectedSort(opt.value); closeDropdowns() }}
                      className={`text-left px-4 py-2.5 hover:bg-gray-50 transition-colors text-xs font-light ${
                        selectedSort === opt.value ? 'bg-gray-50 text-black font-normal' : 'text-gray-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-xs uppercase tracking-widest border-b border-black pb-0.5 ml-2 hover:opacity-70 transition-opacity font-medium text-black"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <ProductGrid products={processedProducts} />
    </div>
  )
}