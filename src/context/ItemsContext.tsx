import { createContext, useContext, useState, ReactNode } from 'react';

interface Item {
  id: string;
  title: string;
  image: string;
  images: string[];
  description: string;
  category: string;
  size: string;
  condition: string;
  points: number;
  location: string;
  uploader: {
    name: string;
    rating: number;
    totalSwaps?: number;
    memberSince?: string;
    responseTime?: string;
    verifiedProfile?: boolean;
  };
  postedDate?: string;
  availability?: string;
  views?: number;
  interested?: number;
  tags?: string[];
}

interface ItemsContextType {
  items: Item[];
  addItem: (item: Item) => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (newItem: Item) => {
    setItems(prev => [newItem, ...prev]);
  };

  return (
    <ItemsContext.Provider value={{ items, addItem }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};