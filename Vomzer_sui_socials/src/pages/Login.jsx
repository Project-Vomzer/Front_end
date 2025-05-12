import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'https://vomzersocials-java-backend.onrender.com';

const Login = () => {
  const [isZkLogin, setIsZkLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = isZkLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(`${BASE_URL}${endpoint}`, formData);

      if (isZkLogin) {
        toast.success('Login successful!');
        // Handle successful login (store token, redirect, etc.)
        console.log('Login response:', response.data);
      } else {
        toast.success('Registration successful!');
        // Handle successful registration
        console.log('Registration response:', response.data);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleZkLogin = async () => {
    setIsLoading(true);
    try {
      // This would be replaced with actual zk proof generation and verification
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        zkProof: 'generated-proof-here', // In a real app, this would be generated
      });
      toast.success('zkLogin successful!');
      console.log('zkLogin response:', response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'zkLogin failed');
      console.error('zkLogin error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="  flex flex-col justify-center container py-12 sm:px-6 lg:px-8">
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
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                />
              </div>
            </div>

            {!isZkLogin && (
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
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