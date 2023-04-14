import { createContext, useContext, useState } from 'react';

const ItemContext = createContext();

function ItemProvider({ children }) {
  const [item, setItem] = useState('');

  return (
    <ItemContext.Provider value={{ item, setItem }}>
      {children}
    </ItemContext.Provider>
  );
}

function useItem() {
  const context = useContext(ItemContext);

  if (context === undefined) {
    throw new Error('useItem needs to be inside the UserProvider');
  }
  return context;
}

export { ItemProvider, useItem };
