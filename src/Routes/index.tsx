import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Products from '../pages/Products';
import Users from '../pages/Users';
import Orders from '../pages/Oders';
import Stores from '../pages/Stores';
import { useAuth } from '../contexts/auth';
import Appbar from '../components/Appbar';
import LoginPage from '../pages/auth';
import ListStores from '../pages/Client';
import ListProducts from '../pages/ListProducts';
import ShopCart from '../pages/ShopCart';

const Routes: React.FC = () => {
  const { signed } = useAuth();

  return (
    <Fragment>
      {signed ? (
        <Switch>
          <Fragment>
            <Appbar />
            <Route path="/" exact>
              <Orders />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/stores">
              <Stores />
            </Route>
            <Route path="/liststores" exact>
              <ListStores />
            </Route>
            <Route path="/liststores/:id">
              <ListProducts />
            </Route>
            <Route path="/shopcart">
              <ShopCart />
            </Route>
          </Fragment>
        </Switch>
      ) : (
        <Redirect to="/login" />
      )}
      <Route path="/login" exact>
        <LoginPage />
      </Route>
    </Fragment>
  );
};

export default Routes;
