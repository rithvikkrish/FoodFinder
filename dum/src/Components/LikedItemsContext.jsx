// LikedItemsContext.js
import  { createContext, useState, useEffect } from 'react';

export const LikedItemsContext = createContext();

export const LikedItemsProvider = ({ children }) => {
    // console.log(children)
  const [likedItems, setLikedItems] = useState([]);

  // Load liked items from local storage when the context mounts
  useEffect(() => {
    const storedLikedItems = JSON.parse(localStorage.getItem('th')) || [];
    setLikedItems(storedLikedItems);
  }, []);

  return (
    <LikedItemsContext.Provider value={{ likedItems, setLikedItems }}>
      {children}
    </LikedItemsContext.Provider>
  );
};
