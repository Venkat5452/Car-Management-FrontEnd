// ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import './Forgotpassword.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './helper';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // Track step (1 = Email, 2 = OTP, 3 = Password)
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const response = await axios.post(`${BASE_URL}/send-otp`, { email });
      response.data === "OTP SENT Succesfully" ? setStep(2) : setError(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const response = await axios.post(`${BASE_URL}/verify-otp`, { email, otp });
      response.data === "OTP Verified" ? setStep(3) : setError("Invalid OTP");
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle new password submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const response = await axios.post(`${BASE_URL}/updatepassword`, { email, password });
      if (response.data === "Password Updated") {
        setMessage("Password Updated Successfully");
        alert("Password Updated Successfully");
        navigate("/login");
      } else {
        setError("Something Went Wrong");
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update password. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render the component
  return (
    <div className="forgot-password-container d-flex align-items-center justify-content-center">
      <div className="card p-4 shadow-sm">
        <h4 className="text-center mb-4">Forgot Password?</h4>
        <p className="text-muted text-center mb-4">Enter your email to receive an OTP for verification.</p>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={step === 1 ? handleEmailSubmit : step === 2 ? handleOtpSubmit : handlePasswordSubmit}>
          {step === 1 && (
            <div className="form-group mb-3">
              <label htmlFor="email" className='mb-1'>Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          {step === 2 && (
            <div className="form-group mb-3">
              <label htmlFor="otp" className='mb-1'>Enter OTP</label>
              <input
                type="text"
                className="form-control"
                id="otp"
                placeholder="Enter the OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}

          {step === 3 && (
            <div className="form-group mb-3">
              <label htmlFor="password" className='mb-1'>New Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
              </>
            ) : (
              step === 1 ? 'Send OTP' : step === 2 ? 'Verify OTP' : 'Update Password'
            )}
          </button>
        </form>
        <button className="btn btn-danger w-100 mt-2" disabled={loading} onClick={() => navigate("/login")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
