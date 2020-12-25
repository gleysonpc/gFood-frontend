import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

interface UsersContextData {
  users: IUser[] | null;
  loading: boolean;
  saving?: boolean;
  addUser(name: string, email: string): Promise<void>;
  updateUser(name: string, email: string, id: number): Promise<void>;
}

export interface IUser {
  id?: number;
  name: string;
  email: string;
}

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export const UsersProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    function fetchUsers() {
      api
        .get<IUser[]>('/users')
        .then((res) => {
          setLoading(false);
          setUsers(res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.warn(err);
          toast.error('Fail to load users! :( ');
        });
    }
    fetchUsers();
  }, []);

  async function addUser(name: string, email: string) {
    setSaving(true);
    api
      .post<IUser>('/users', { name, email })
      .then((res) => {
        setSaving(false);
        setUsers([...(users as IUser[]), res.data]);
      })
      .catch((err) => {
        setSaving(false);
        console.warn(err);
        toast.error('Fail to create user! :( ');
      });
  }

  async function updateUser(name: string, email: string, id: number) {
    setSaving(true);
    api
      .patch<IUser>(`/users/${id}`, { name, email })
      .then((res) => {
        setSaving(false);
        const list = users?.map((item) => {
          if (item.id === id) {
            item = res.data;
          }
          return item;
        });

        setUsers(list as IUser[]);
      })
      .catch((err) => {
        setSaving(false);
        toast.error('Fail to update user! :( ');
        console.warn(err);
      });
  }

  return (
    <UsersContext.Provider
      value={{ users, loading, addUser, updateUser, saving }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export function useUsers() {
  const context = useContext(UsersContext);
  return context;
}
