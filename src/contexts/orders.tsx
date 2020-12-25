import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

import api from '../services/api';
import { useAuth } from './auth';

export interface IOrder {
  id: number;
  status: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  store: {
    id: number;
    description: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}

interface OrdersContextData {
  orders: IOrder[];
  acceptOrder(orderId: number): void;
  refuseOrder(orderId: number): void;
  finishOrder(orderId: number): void;
  addOrder(order: IOrder): void;
}

const OrdersContext = createContext<OrdersContextData>({} as OrdersContextData);

export const OrdersProvider: React.FC = ({ children }) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.store) {
      api
        .get(`/orders/bystore/${user?.store.id}`)
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          toast.error('Fail to load orders! :( ');
        });
    }
  }, [user]);

  function addOrder(order: IOrder) {
    setOrders([...orders, order]);
  }

  function acceptOrder(orderId: number) {
    api.patch(`/orders/${orderId}`, { status: 'ACCEPTED' }).then((res) => {
      let list = orders.map((item) => {
        if (item.id === orderId) {
          return { ...item, status: 'ACCEPTED' };
        }
        return item;
      });
      setOrders(list);
      toast.success('Order Accepted! :)');
    });
  }

  function refuseOrder(orderId: number) {
    api.patch(`/orders/${orderId}`, { status: 'REFUSED' }).then((res) => {
      let list = orders.map((item) => {
        if (item.id === orderId) {
          return { ...item, status: 'REFUSED' };
        }
        return item;
      });
      setOrders(list);
      toast.info('Order Refused! \\o/');
    });
  }

  function finishOrder(orderId: number) {
    api.patch(`/orders/${orderId}`, { status: 'DONE' }).then((res) => {
      let list = orders.map((item) => {
        if (item.id === orderId) {
          return { ...item, status: 'DONE' };
        }
        return item;
      });
      setOrders(list);
      toast.success('Order Finished! :D');
    });
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        acceptOrder,
        finishOrder,
        refuseOrder,
        addOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export function useOrders() {
  const context = useContext(OrdersContext);
  return context;
}
