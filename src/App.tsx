import React, { useEffect } from 'react';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import { ContextCompose } from './components/ContextCompose';
import { UsersProvider } from './contexts/users';
import { StoresProvider } from './contexts/stores';
import { ProductsProvider } from './contexts/products';
import { CartProvider } from './contexts/cart';
import { OrdersProvider } from './contexts/orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer position="bottom-center" />
      <ContextCompose
        components={[
          AuthProvider,
          UsersProvider,
          StoresProvider,
          ProductsProvider,
          CartProvider,
          OrdersProvider,
        ]}
      >
        <Routes />
      </ContextCompose>
    </Router>
  );
};

export default App;
