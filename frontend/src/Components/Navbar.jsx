import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Heart, User } from 'lucide-react';
import { ShopContext } from '../Context/ShopContext';
import { WishlistContext } from '../Context/WishlistContext';

const NAV_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Shop Now', to: '/shop' },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { getTotalCartItems } = useContext(ShopContext);
  const { getWishlistCount } = useContext(WishlistContext);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const NavUnderline = ({ active }) => (
    <span
      className={`absolute bottom-0 left-0 w-full h-[1px] bg-black transition-transform duration-300 origin-left ${
        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`}
    />
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'h-16 bg-white/95 backdrop-blur-md shadow-[0_1px_10px_rgba(0,0,0,0.04)]'
            : 'h-20 bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 md:px-16 flex items-center justify-between">

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 -ml-2 text-black hover:text-gray-400 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="font-['Playfair_Display'] uppercase text-xl md:text-2xl tracking-[0.15em] font-light text-black select-none hover:opacity-70 transition-opacity absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
          >
            
            Sykshades
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map(({ label, to }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`text-xs uppercase tracking-widest transition-colors py-2 relative group ${
                    active ? 'text-black' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  {label}
                  <NavUnderline active={active} />
                </Link>
              );
            })}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-1 md:space-x-3">

            <Link
              to="/wishlist"
              className="p-2 text-black hover:text-gray-400 transition-colors flex items-center"
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1.5} />
              {getWishlistCount() > 0 && (
                <span className="ml-1 text-xs font-light">({getWishlistCount()})</span>
              )}
            </Link>

            <Link
              to="/cart"
              className="p-2 text-black hover:text-gray-400 transition-colors flex items-center"
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="ml-1 text-xs font-light">({getTotalCartItems()})</span>
            </Link>

            {localStorage.getItem('auth-token') ? (
              <button
                onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }}
                className="hidden sm:flex items-center border border-black px-4 py-1.5 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="p-2 text-black hover:text-gray-400 transition-colors hidden sm:flex"
                aria-label="Login"
              >
                <User size={18} strokeWidth={1.5} />
              </Link>
            )}

          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden flex flex-col justify-between">
          <nav className="flex flex-col mt-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-300 mt-6 mb-3">Menu</p>
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className="text-3xl tracking-wide text-black block py-3 border-b border-gray-100"
              >
                {label}
              </Link>
            ))}

            <p className="text-[10px] uppercase tracking-widest text-gray-300 mt-8 mb-3">Account</p>
            <Link
              to="/wishlist"
              onClick={() => setMobileOpen(false)}
              className="text-2xl tracking-wide text-black block py-3 border-b border-gray-100"
            >
              Wishlist {getWishlistCount() > 0 && `(${getWishlistCount()})`}
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileOpen(false)}
              className="text-2xl tracking-wide text-black block py-3 border-b border-gray-100"
            >
              Bag ({getTotalCartItems()})
            </Link>
            {!localStorage.getItem('auth-token') && (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="text-2xl tracking-wide text-black block py-3 border-b border-gray-100"
              >
                Login
              </Link>
            )}
          </nav>

          <div className="pb-12 border-t border-gray-100 pt-6">
            <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-2">Customer Service</p>
            <p className="text-xs font-light text-gray-500 mb-4">support@sykshades.com</p>
            <p className="text-[9px] uppercase tracking-widest text-gray-300">
              © {new Date().getFullYear()} SYKSHADES. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      )}
    </>
  );
};