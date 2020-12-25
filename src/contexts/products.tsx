import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { IStore } from './stores';

interface ProductsContextData {
  products: IProduct[] | null;
  loading: boolean;
  saving?: boolean;
  addProduct(
    description: string,
    price: number,
    storeId: number
  ): Promise<void>;
  updateProduct(description: string, price: number, id: number): Promise<void>;
}

export interface IProduct {
  id?: number;
  description: string;
  price: number;
  store?: IStore;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

export const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    function fetchProducts() {
      api
        .get<IProduct[]>('/products')
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          toast.error('Fail to load products! :( ');
        });
    }
    fetchProducts();
  }, []);

  async function addProduct(
    description: string,
    price: number,
    storeId: number
  ) {
    setSaving(true);
    api
      .post<IProduct>('/products', { description, price, storeId })
      .then((res) => {
        setSaving(false);
        setProducts([...(products as IProduct[]), res.data]);
      })
      .catch((err) => {
        setSaving(false);
        console.warn(err);
        toast.error('Fail to create product! :( ');
      });
  }

  async function updateProduct(description: string, price: number, id: number) {
    setSaving(true);
    api
      .patch<IProduct>(`/products/${id}`, { description, price })
      .then((res) => {
        setSaving(false);
        const list = products?.map((item) => {
          if (item.id === id) {
            item = res.data;
          }
          return item;
        });

        setProducts(list as IProduct[]);
      })
      .catch((err) => {
        setSaving(false);
        console.warn(err);
        toast.error('Fail to update product! :( ');
      });
  }

  return (
    <ProductsContext.Provider
      value={{ products, loading, addProduct, updateProduct, saving }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export function useProducts() {
  const context = useContext(ProductsContext);
  return context;
}
