'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle } from '@/lib/db/types';

interface CartItem {
  vehicle: Vehicle;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (vehicle: Vehicle) => void;
  removeFromCart: (vehicleId: string) => void;
  updateQuantity: (vehicleId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('km_cart');
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading cart:', e);
    }
    setMounted(true);
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('km_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cart, mounted]);

  const addToCart = (vehicle: Vehicle) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.vehicle.id === vehicle.id);
      if (existing) {
        return prev.map((item) =>
          item.vehicle.id === vehicle.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { vehicle, quantity: 1 }];
    });
  };

  const removeFromCart = (vehicleId: string) => {
    setCart((prev) => prev.filter((item) => item.vehicle.id !== vehicleId));
  };

  const updateQuantity = (vehicleId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(vehicleId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.vehicle.id === vehicleId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = cart.reduce((sum, item) => {
    const price = item.vehicle.promo_price || item.vehicle.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
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
