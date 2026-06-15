import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaPinterest, FaWhatsapp } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-white  mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16 w-[75%] border-t border-gray-300 mb-16">

        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-[1fr_1fr_1.3fr] gap-16">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link
              to="/"
              className="text-sm tracking-[0.2em] font-medium text-black hover:opacity-70 transition-opacity"
            >
              SYKSHADES
            </Link>

            <p className="text-sm font-light text-gray-400 leading-relaxed">
              A study in fabric, weight, and silhouette. Offering
              premium fashion essentials curated for everyday elegance.
            </p>

            <div className="flex gap-3 mt-2">
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-black hover:border-black transition-colors"
              >
                <FaInstagram size={13} />
              </a>

              <a
                href="#"
                aria-label="Pinterest"
                className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-black hover:border-black transition-colors"
              >
                <FaPinterest size={13} />
              </a>

              <a
                href="#"
                aria-label="WhatsApp"
                className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-black hover:border-black transition-colors"
              >
                <FaWhatsapp size={13} />
              </a>
            </div>
          </div>

          {/* Sitemap */}
          <div className="flex flex-col gap-5">
            <p className="text-xs uppercase tracking-[0.2em] text-black font-medium">
              Sitemap
            </p>

            <ul className="flex flex-col gap-3">
              {[
                { label: 'Shop', to: '/shop' },
                { label: 'About Us', to: '/about' },
                { label: 'Wishlist', to: '/wishlist' },
                { label: 'Cart', to: '/cart' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm font-light text-gray-400 hover:text-black transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">
              Stay Updated
            </p>

            <h3
              className="text-3xl md:text-4xl leading-tight text-black"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Get Exclusive Offers
              <br />
              On Your Email
            </h3>

            <p className="text-sm font-light text-gray-400 leading-relaxed">
              Subscribe to our newsletter and stay updated
            </p>

            <div className="flex mt-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 h-12 px-4 border border-gray-300 text-sm text-black placeholder-gray-400 bg-white focus:outline-none"
              />

              <button
                type="button"
                className="h-12 px-6 bg-black text-white text-[10px] tracking-[0.2em] font-medium hover:bg-neutral-800 transition-colors"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-light">
            © {new Date().getFullYear()} SYKSHADES. All Rights Reserved.
          </p>

          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-light">
            Designed by Samyak Sigdel
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;