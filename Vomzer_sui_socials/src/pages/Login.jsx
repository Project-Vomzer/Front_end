import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'https://vomzersocials-java-backend-1.onrender.com/api';

const isValidUsername = (username) => {
  return username && username.length >= 3 && username.length <= 50 && /^[a-zA-Z0-9._-]+$/.test(username);
};

const isValidPassword = (password) => {
  return password && password.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password);
};

const Login = () => {
  const [authMode, setAuthMode] = useState('zk');
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = 'Username is required';
    } else if (!isValidUsername(formData.userName)) {
      newErrors.userName = 'Username must be 3-50 characters (letters, numbers, ., -, _)';
    }

    if (authMode === 'standard') {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (!isLogin && !isValidPassword(formData.password)) {
        newErrors.password = 'Password must be 8+ chars with uppercase, lowercase, number, and special character';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleLogin = async () => {
    try {
      const simulatedJwt = 'simulated.google.jwt.token';
      toast.info('Google authentication successful (simulated)');
      return simulatedJwt;
    } catch (error) {
      toast.error('Google authentication failed');
      console.error('Google auth error:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      let endpoint, payload;

      if (isLogin) {
        endpoint = `/auth/login/${authMode}`;
        payload = authMode === 'standard' 
          ? { 
              userName: formData.userName, 
              password: formData.password 
            }
          : { userName: formData.userName };
      } else {
        endpoint = `/auth/register/${authMode}`;
        payload = authMode === 'standard'
          ? { 
              userName: formData.userName,
              password: formData.password
            }
          : { userName: formData.userName };
      }

      // Create axios instance with proper CORS configuration
      const api = axios.create({
        baseURL: BASE_URL,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const response = await api.post(endpoint, payload);

      if (response.data) {
        const successMessage = isLogin 
          ? 'Login successful!' 
          : 'Registration successful!';
        
        toast.success(successMessage);
        
        if (isLogin) {
          if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userName', formData.userName);
          }
          window.location.href = '/';
        } else {
          setIsLogin(true);
          setFormData(prev => ({ ...prev, password: '' }));
        }
      }
    } catch (error) {
      console.error('API Error:', error);
      
      let errorMsg = 'An error occurred';
      if (error.response) {
        if (error.response.status === 401) {
          errorMsg = 'Unauthorized: Please check your credentials';
        } else if (error.response.status === 400) {
          errorMsg = error.response.data?.message || 'Invalid request data';
        } else {
          errorMsg = error.response.data?.message || `Server error: ${error.response.status}`;
        }
      } else if (error.message === 'Network Error') {
        errorMsg = 'Network Error: Could not connect to server. Please try again later.';
      } else if (error.code === 'ERR_NETWORK') {
        errorMsg = 'Network connection failed. Check your internet connection.';
      }

      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={5000} />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex mb-6 rounded-md shadow-sm">
            <button
              onClick={() => setAuthMode('zk')}
              className={`flex-1 py-2 px-4 rounded-l-md text-sm font-medium ${
                authMode === 'zk' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              disabled={isLoading}
            >
              zkLogin
            </button>
            <button
              onClick={() => setAuthMode('standard')}
              className={`flex-1 py-2 px-4 rounded-r-md text-sm font-medium ${
                authMode === 'standard' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              disabled={isLoading}
            >
              Standard
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  required
                  value={formData.userName}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.userName ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                  disabled={isLoading}
                />
                {errors.userName && (
                  <p className="mt-2 text-sm text-red-600">{errors.userName}</p>
                )}
              </div>
            </div>

            {authMode === 'standard' && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                    disabled={isLoading}
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>
              </div>
            )}

            {authMode === 'zk' && !isLogin && (
              <div>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  disabled={isLoading}
                >
                  Authenticate with Google
                </button>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : isLogin ? 'Sign in' : 'Register'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {isLogin ? 'New to platform?' : 'Already have an account?'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                  setFormData({
                    userName: formData.userName,
                    password: ''
                  });
                }}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                disabled={isLoading}
              >
                {isLogin ? 'Create a new account' : 'Sign in to existing account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;