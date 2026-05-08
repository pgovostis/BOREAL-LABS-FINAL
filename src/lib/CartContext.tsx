import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string; // e.g. "slug-dosage"
  productId: string;
  name: string;
  dosage: string;
  price: number; 
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, openCart?: boolean) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cartItems');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse cart items", e);
    }
    return [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>, openCart = true) => {
    setItems((currentItems) => {
      const existing = currentItems.find((i) => i.id === newItem.id);
      if (existing) {
        return currentItems.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...currentItems, { ...newItem, quantity: 1 }];
    });
    if (openCart) {
      setIsCartOpen(true);
    }
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((current) =>
      current.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
