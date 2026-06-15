import React from 'react'
import { Link } from 'react-router-dom'

export const AboutUs = () => {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-0">
        <div className="relative overflow-hidden h-[70vh]">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
            alt="SYKSHADES Store"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-12 left-12 flex flex-col gap-4 max-w-lg">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70 font-medium">
              Our Story
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl font-light text-white leading-tight tracking-tight">
              About <br />
              <span className="font-medium">SYKSHADES</span>
            </h1>
          </div>
        </div>
      </div>

      {/* ── Mission statement ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 border-b border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-4">
              Who We Are
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-black tracking-tight leading-tight">
              Fashion That Feels <br />
              <span className="font-medium">Effortless</span>
            </h2>
          </div>
          <div>
            <p className="text-sm font-light text-gray-500 leading-[1.9]">
              SYKSHADES was founded with a simple belief  fashion should feel effortless,
              timeless, and accessible. Every piece in our collection is curated with care,
              balancing modern trends with enduring style that transcends seasons.
            </p>
          </div>
        </div>
      </div>

      {/* ── Values grid ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 border-b border-gray-200">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-3">
            What We Stand For
          </p>
          <h2 className="font-serif text-4xl font-light text-black tracking-tight">
            Our Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-l border-t border-gray-200">
          {[
            {
              number: '01',
              title: 'Quality First',
              body: 'We work exclusively with trusted materials and craftsmanship. Every garment is held to a standard that ensures it earns a permanent place in your wardrobe.'
            },
            {
              number: '02',
              title: 'Timeless Design',
              body: 'Trend-aware but never trend-dependent. Our pieces are designed to be worn for years, not seasons — versatile staples that complement every style.'
            },
            {
              number: '03',
              title: 'Honest Fashion',
              body: 'No inflated prices, no empty promises. We believe premium fashion can be accessible — and that great clothing speaks for itself without the hype.'
            },
          ].map(({ number, title, body }) => (
            <div
              key={number}
              className="border-r border-b border-gray-200 p-8 sm:p-10 flex flex-col gap-5"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-gray-300 font-medium">
                {number}
              </span>
              <h3 className="font-serif text-2xl font-light text-black tracking-tight">
                {title}
              </h3>
              <p className="text-sm font-light text-gray-500 leading-[1.9]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Split section ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 border-b border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80"
              alt="Our process"
              className="w-full h-[500px] object-cover object-center hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">
              From Us To You
            </p>
            <h2 className="font-serif text-4xl font-light text-black tracking-tight leading-tight">
              Built With <br />
              <span className="font-medium">Intention</span>
            </h2>
            <div className="border-t border-gray-200 pt-6 flex flex-col gap-4">
              <p className="text-sm font-light text-gray-500 leading-[1.9]">
                We work with quality materials and trusted craftsmanship to bring you clothing
                that doesn't just look good  it lasts. From our warehouse to your wardrobe,
                every step of your experience is designed to be smooth, secure, and satisfying.
              </p>
              <p className="text-sm font-light text-gray-500 leading-[1.9]">
                Each collection is thoughtfully assembled  not chased. We take the time to
                get things right, so you can shop with confidence every single time.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Stats ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 border-b border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-l border-t border-gray-200">
          {[
            { stat: '500+', label: 'Products Curated' },
            { stat: '10K+', label: 'Happy Customers' },
            { stat: '3', label: 'Collections Launched' },
            { stat: '100%', label: 'Quality Guaranteed' },
          ].map(({ stat, label }) => (
            <div
              key={label}
              className="border-r border-b border-gray-200 p-8 sm:p-10 flex flex-col gap-2"
            >
              <span className="font-serif text-4xl font-light text-black tracking-tight">
                {stat}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-lg">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">
              Ready to Explore
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-black tracking-tight leading-tight">
              Thank You For <br />
              <span className="font-medium">Being Here</span>
            </h2>
            <p className="text-sm font-light text-gray-500 leading-[1.9]">
              We're grateful for every person who chooses SYKSHADES.
              We're just getting started and the best is yet to come.
            </p>
          </div>
          <Link
            to="/shop"
            className="group relative inline-flex items-center overflow-hidden border border-black px-10 py-4 text-xs uppercase tracking-widest text-black hover:text-white transition-colors duration-500 self-start lg:self-end"
          >
            <span className="relative z-10">Shop Collection</span>
            <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
          </Link>
        </div>
      </div>

    </div>
  )
}