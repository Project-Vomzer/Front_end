import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'https://vomzersocials-java-backend.onrender.com';

const Login = () => {
  const [isZkLogin, setIsZkLogin] = useState(true);
  const [formData, setFormData] = useState({
    userName: '',  
    password: '',
    email: '',
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
    }
    
    if (!isZkLogin) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
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
      const endpoint = isZkLogin ? '/api/auth/login' : '/api/auth/register';
      console.log('Sending to:', `${BASE_URL}${endpoint}`);
      console.log('Payload:', formData);

      const response = await axios.post(`${BASE_URL}${endpoint}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response.data);
      
      if (isZkLogin) {
        toast.success('Login successful!');
        localStorage.setItem('authToken', response.data.token);
        window.location.href = '/';
      } else {
        toast.success('Registration successful! Please login.');
        setIsZkLogin(true); 
      }
    } catch (error) {
      console.error('Full error:', error);
      
      
      if (error.response) {
        console.error('Error response:', error.response);
        
    
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
        
        const errorMessage = error.response.data.message || 
                           error.response.data.error || 
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

  const handleZkLogin = async () => {
    setIsLoading(true);
    try {
      const zkProof = 'generated-proof-here';
      
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        zkProof,
        userName: formData.userName  
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      toast.success('zkLogin successful!');
      console.log('zkLogin response:', response.data);
      
      
      localStorage.setItem('authToken', response.data.token);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('zkLogin error:', error);
      toast.error(error.response?.data?.message || 'zkLogin failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center container py-12 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-medium text-white prata-regular">
          {isZkLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          {isZkLogin ? (
            <>
              <div className="mb-6">
                <button
                  onClick={handleZkLogin}
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Login with zkProof'}
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
            </>
          ) : null}

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

            {!isZkLogin && (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

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
                      className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
              >
                {isLoading
                  ? 'Processing...'
                  : isZkLogin
                  ? 'Sign in'
                  : 'Register'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsZkLogin(!isZkLogin)}
              className="font-medium text-teal-600 hover:text-teal-500"
            >
              {isZkLogin
                ? 'Need to create an account?'
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;