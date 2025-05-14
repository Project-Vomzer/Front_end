import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'https://vomzersocials-java-backend.onrender.com';

const isValidUsername = (username) => {
  return (
    username &&
    username.length >= 3 &&
    username.length <= 50 &&
    /^[a-zA-Z0-9._-]+$/.test(username)
  );
};

const isValidPassword = (password) => {
  return (
    password &&
    password.length >= 8 &&
    password.length <= 128 &&
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]+$/.test(password)
  );
};

const Login = () => {
  const [authMode, setAuthMode] = useState('zk');
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = 'Username is required';
    } else if (!isValidUsername(formData.userName)) {
      newErrors.userName =
        'Username must be 3-50 characters and contain only letters, numbers, ".", "-", or "_"';
    }

    if (authMode === 'standard') {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (!isValidPassword(formData.password)) {
        newErrors.password =
          'Password must be 8-128 characters, include uppercase, lowercase, number, and special character (@$!%?&)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      let endpoint, payload;

      if (authMode === 'standard') {
        if (isLogin) {
          endpoint = '/api/auth/login/standard';
          payload = {
            userName: formData.userName,
            password: formData.password,
          };
        } else {
          endpoint = '/api/auth/register/standard';
          payload = {
            userName: formData.userName,
            password: formData.password,
          };
        }
      } else {
        if (isLogin) {
          endpoint = '/api/auth/login/zk';
          payload = {
            userName: formData.userName,
            zkProof: 'generated-proof-here',
          };
        } else {
          endpoint = '/api/auth/register/zk';
          payload = {
            userName: formData.userName,
            zkProof: 'generated-proof-here',
          };
        }
      }

      console.log('Sending to:', `${BASE_URL}${endpoint}`);
      console.log('Payload:', payload);

      const response = await axios.post(`${BASE_URL}${endpoint}`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response.data);

      toast.success(isLogin ? 'Login successful!' : 'Registration successful!');

      if (isLogin) {
        localStorage.setItem('JWT_SECRET_KEY', response.data?.JWT_SECRET_KEY);
        window.location.href = '/';
      } else {
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Full error:', error);

      if (error.response) {
        console.error('Error response:', error.response);

        if (error.response?.data?.errors) {
          setErrors(error?.response?.data.errors);
        }

        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          'An error occurred. Please try again.';
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error('No response from server. Please check your connection.');
      } else {
        toast.error('Request failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center container py-12 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-medium text-white prata-regular">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <div className="flex mb-6">
            <button
              onClick={() => setAuthMode('zk')}
              className={`flex-1 py-2 px-4 rounded-l-md text-sm font-medium ${authMode === 'zk' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              zk Authentication
            </button>
            <button
              onClick={() => setAuthMode('standard')}
              className={`flex-1 py-2 px-4 rounded-r-md text-sm font-medium ${authMode === 'standard' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Standard Auth
            </button>
          </div>

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
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
                  className={`appearance-none block w-full px-3 py-2 border ${errors.userName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                />
                {errors.userName && (
                  <p className="mt-1 text-sm text-red-600">{errors.userName}</p>
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
                    required={authMode === 'standard'}
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
              >
                {isLoading
                  ? 'Processing...'
                  : isLogin
                  ? 'Sign in'
                  : 'Register'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-teal-600 hover:text-teal-500"
            >
              {isLogin
                ? 'Need to create an account?'
                : 'Already have an account?  Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
