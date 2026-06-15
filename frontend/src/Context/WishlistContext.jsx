import React, { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext(null);

const WishlistContextProvider = (props) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist-items');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('wishlist-items', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (itemId) => {
    setWishlistItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const getWishlistCount = () => {
    return Object.values(wishlistItems).filter(Boolean).length;
  };

  const contextValue = { wishlistItems, toggleWishlist, getWishlistCount };

  return (
    <WishlistContext.Provider value={contextValue}>
      {props.children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;