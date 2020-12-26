import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { useAuth } from './auth';
import { IProduct } from './products';

interface CartContextData {
  total: number;
  items: CartItem[];
  addToCart(product: IProduct): void;
  removeFromCart(productId: number): void;
  clearCart(): void;
  placeOrder(): void;
}

interface CartItem {
  id: number;
  description: string;
  price: number;
  storeId?: number;
  store?: any;
  quantity: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const { user } = useAuth();

  function addToCart(product: CartItem) {
    const itemFound = items.find((item) => item.id === product.id);
    if (itemFound) {
      const list = items.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setItems(list);
      setTotal(total + 1);
      localStorage.setItem(
        '@Cart',
        JSON.stringify({
          items: list,
          total: total + 1,
        })
      );
    } else {
      delete product.store;
      //delete product.storeId;
      product.quantity = 1;
      setItems([...items, product]);
      setTotal(total + 1);
      localStorage.setItem(
        '@Cart',
        JSON.stringify({
          items: [...items, product],
          total: total + 1,
        })
      );
    }
  }

  function removeFromCart(productId: number) {
    const itemFoundIndex = items.findIndex((item) => item.id === productId);

    if (itemFoundIndex >= 0 && items[itemFoundIndex].quantity > 1) {
      let updatedList = items;
      updatedList[itemFoundIndex].quantity =
      updatedList[itemFoundIndex].quantity - 1;
      setItems(updatedList);
      const updatedTotal = total - 1;
      localStorage.setItem(
        '@Cart',
        JSON.stringify({
          items: updatedList,
          total: updatedTotal,
        })
      );
    } else {
      const itemFound = items.find((item) => item.id === productId);
      if (itemFound) {
        setItems(items.filter((item) => item.id !== productId));
        const updatedList = items.filter((item) => item.id !== productId);
        const updatedTotal = total - 1;
        setTotal(total - 1);
        localStorage.setItem(
          '@Cart',
          JSON.stringify({
            items: updatedList,
            total: updatedTotal,
          })
        );
      }
    }

    if (total === 1) {
      setItems([]);
      setTotal(0);
      localStorage.removeItem('@Cart');
    }
  }

  function clearCart() {
    setItems([]);
    setTotal(0);
    localStorage.removeItem('@Cart');
    toast.success('Your shopcart whas cleared! :)');
  }

  function placeOrder() {
    api
      .post('/orders', { userId: user?.id, storeId: items[0].storeId })
      .then((res) => {
        console.log(res.data);
        setItems([]);
        setTotal(0);
        localStorage.removeItem('@Cart');
        toast.success('Order Placed! :)');
      });
  }

  useEffect(() => {
    function loadStorageData() {
      const localCart = localStorage.getItem('@Cart');
      if (localCart) {
        const { items, total } = JSON.parse(localCart);
        setItems(items);
        setTotal(total);
      }
    }

    loadStorageData();
  }, []);

  return (
    <CartContext.Provider
      value={{ addToCart, removeFromCart, clearCart, total, items, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
