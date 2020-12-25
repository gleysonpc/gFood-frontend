import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { IUser } from './users';

interface StoresContextData {
  stores: IStore[] | null;
  loading: boolean;
  saving?: boolean;
  addStore(description: string, userId: number): Promise<void>;
  updateStore(description: string, userId: number, id: number): Promise<void>;
}

export interface IStore {
  id?: number;
  description: string;
  user?: IUser;
}

const StoresContext = createContext<StoresContextData>({} as StoresContextData);

export const StoresProvider: React.FC = ({ children }) => {
  const [stores, setStores] = useState<IStore[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    function fetchStores() {
      api
        .get<IStore[]>('/stores')
        .then((res) => {
          setStores(res.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error('Fail to load stores! :( ');
        });
    }
    fetchStores();
  }, []);

  async function addStore(description: string, userId: number) {
    setSaving(true);
    api
      .post<IStore>('/stores', { description, userId })
      .then((res) => {
        setSaving(false);
        setStores([...(stores as IStore[]), res.data]);
      })
      .catch((err) => {
        setSaving(false);
        console.warn(err);
        toast.error('Fail to create store! :( ');
      });
  }

  async function updateStore(description: string, userId: number, id: number) {
    setSaving(true);
    api
      .patch<IStore>(`/stores/${id}`, { description, userId })
      .then((res) => {
        setSaving(false);
        const list = stores?.map((item) => {
          if (item.id === id) {
            item = res.data;
          }
          return item;
        });

        setStores(list as IStore[]);
      })
      .catch((err) => {
        setSaving(false);
        toast.error('Fail to update store! :( ');
        console.warn(err);
      });
  }

  return (
    <StoresContext.Provider
      value={{ stores, loading, addStore, updateStore, saving }}
    >
      {children}
    </StoresContext.Provider>
  );
};

export function useStores() {
  const context = useContext(StoresContext);
  return context;
}
