import React, { useState } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useHistory for navigation
import './Signup.css'; // Import the CSS file for custom styles
import axios from 'axios';
import { BASE_URL } from './helper'; // Import the base URL from helper.js

function Signup() {
  // State to handle OTP flow, form data, error messages, and loading state
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);  // Add loading state
  const [user, SetUser] = useState({
    name: "",
    email: "",
    password: "",
    otp: ""
  });
  
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  const handleChange = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const { name, value } = e.target;
    SetUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("Loading");
    setLoading(true);  // Set loading to true when submitting form
    console.log(user);
    
    if (user.name !== "" && user.email !== "" && user.password !== "") {
      if (!otpSent) {
        // Send OTP if it hasn't been sent yet
        axios.post(BASE_URL + "/makemail", user).then((res) => {
          setLoading(false);  // Stop loading after the response is received
          if (res.data === "OTP SENT Succesfully") {
            setOtpSent(true);
            setErrorMessage("");
          } else {
            setErrorMessage(res.data);
          }
        });
      } else {
        // Verify OTP if it's already sent
        if (user.otp !== "") {
          axios.post(BASE_URL + "/signup", user).then((res) => {
            setLoading(false);  // Stop loading after the response is received
            if (res.data === "SuccessFully Registered") {
              setErrorMessage(res.data + " Please Login");
              setOtpVerified(true);
              setOtpSent(false);
              SetUser({
                name: "",
                email: "",
                password: "",
                otp: ""
              });
              navigate("/login");
            } else {
              setErrorMessage(res.data);
            }
          });
        } else {
          setLoading(false);  // Stop loading if OTP is invalid
          setErrorMessage("Invalid OTP");
        }
      }
    } else {
      setLoading(false);  // Stop loading if form details are invalid
      setErrorMessage("Invalid Details");
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center mt-4 mb-4 m-1'>
      <Card className='p-4 shadow-lg' style={{ width: '500px' }}>
        <h3 className='text-center text-danger mb-4'>Welcome to Car Management Application! Your Journey Starts Here</h3>
        <h5 className='text-center mb-3'>Please fill in the details below:</h5>

        {errorMessage && errorMessage !== "Loading" && errorMessage !== "SuccessFully Registered Please Login" && <Alert className='text-center' variant='danger'>{errorMessage}</Alert>}
        {errorMessage && (errorMessage === "Loading" || errorMessage === "SuccessFully Registered Please Login") && <Alert className='text-center' variant='success'>{errorMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* Name Field */}
          <Form.Group controlId='formName'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your name'
              name='name'
              value={user.name}
              onChange={handleChange}
              required
              disabled={otpSent && !otpVerified} // Disable when OTP sent or loading
            />
          </Form.Group>

          {/* Email Field */}
          <Form.Group controlId='formEmail' className='mt-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter your email'
              value={user.email}
              onChange={handleChange}
              required
              disabled={otpSent && !otpVerified} // Disable when OTP sent or loading
            />
          </Form.Group>

          {/* Password Field */}
          <Form.Group controlId='formPassword' className='mt-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Enter your password'
              value={user.password}
              onChange={handleChange}
              required
              disabled={otpSent && !otpVerified} // Disable when OTP sent or loading
            />
          </Form.Group>

          {/* OTP Field (only if OTP is sent and not verified yet) */}
          {otpSent && !otpVerified && (
            <Form.Group controlId='formOtp' className='mt-3'>
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                type='text'
                name='otp'
                placeholder='Enter OTP sent to your email'
                value={user.otp}
                minLength={6}
                onChange={handleChange}
                required
                disabled={loading} // Disable when loading
              />
            </Form.Group>
          )}

          {/* Submit Button */}
          <Button variant='primary' type='submit' className='mt-4 w-100' disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" /> // Display a spinner when loading
            ) : (
              otpSent ? 'Verify OTP' : 'Send OTP'
            )}
          </Button>

          {/* Link to Login page if already registered */}
          <div className='text-center mt-3'>
            <p>
              Already registered?{' '}
              <Button variant='link' onClick={() => navigate("/login")}>
                Login here
              </Button>
            </p>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Signup;
