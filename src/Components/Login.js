import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import './Login.css'; // Custom CSS for additional styles
import axios from 'axios';
import { BASE_URL } from './helper.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setErrorMessage('');
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('Loading...');
    if (user.email !== '' && user.password !== '') {
      axios.post(BASE_URL + '/login', user)
        .then((res) => {
          if (res.data.message === 'Log in successFull') {
            localStorage.setItem('logintoken', user.email);
            localStorage.setItem('username', res.data.user.name);
            setErrorMessage('');
            navigate('/dashboard');
          } else {
            setErrorMessage(res.data.message);
          }
        })
        .catch((error) => {
          setErrorMessage('An error occurred while logging in. Please try again.');
        });
    } else {
      setErrorMessage('Invalid Details');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('logintoken')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-90 bg-light">
      {/* Welcome Message */}
      <div className="welcome-message text-center m-3">
        <h1>Welcome Back!</h1>
        <p>Please log in to continue using CarMan and manage your car listings.</p>
      </div>

      {/* Login Card */}
      <Card className="p-4 shadow-lg mb-4 m-2" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Login Here</h2>

        {errorMessage && (
          <Alert className='text-center' variant={errorMessage === 'Loading...' ? 'info' : 'danger'}>
            {errorMessage}
          </Alert>
        )}

        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4 w-100">
            Login
          </Button>

          <div className="text-center mt-3">
            <a href="/signup" className="text-muted">
              Don't have an account ? Sign up
            </a>
          </div>
          <div className="text-center mt-3">
            <a href="/updatepassword" className="text-danger text-muted">
              Forgot Password ? Click Here
            </a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
