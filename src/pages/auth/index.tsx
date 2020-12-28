import React, { FormEvent, useState } from 'react';
import './login.css';
import loginLogo from '../../assets/order.png';
import { useAuth } from '../../contexts/auth';
import { Button, Form, Input, Label } from 'reactstrap';
import { Redirect, useLocation } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const { signIn, signed } = useAuth();
  const location = useLocation();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    signIn(email);
  }

  const { from } = (location.state as any) || { from: { pathname: '/' } };

  if (signed) {
    return <Redirect to={from} />;
  }

  return (
    <div className="text-center" id="login-root">
      <main className="form-signin">
        <Form onSubmit={handleSubmit}>
          <img className="mb-4" src={loginLogo} alt="" width="72" height="70" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <Label htmlFor="email" className="visually-hidden">
            Email address
          </Label>
          <Input
            value={email}
            type="email"
            id="email"
            className="form-control"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="w-100" size="lg" color="primary" type="submit">
            Sign in
          </Button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
        </Form>
      </main>
    </div>
  );
};

export default Login;
