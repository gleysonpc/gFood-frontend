import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { component, ...other } = props;
  const Component: any = component;
  const { signed } = useAuth();

  return (
    <Route
      {...other}
      render={(props) => {
        return signed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
