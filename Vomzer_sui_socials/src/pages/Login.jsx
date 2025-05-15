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

// 🔐 Placeholder for zk-proof generation logic
const generateZkProof = (username) => {
  // You should replace this with actual zk proof generation logic
  return `zk-proof-for-${username}`;
};

const Login = () => {
  const [authMode, setAuthMode] = useState('zk');
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ userName: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = 'Username is required';
    } else if (!isValidUsername(formData.userName)) {
      newErrors.userName = 'Username must be 3-50 characters and valid format';
    }

    if (authMode === 'standard') {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (!isValidPassword(formData.password)) {
        newErrors.password = 'Invalid password format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const endpoint = isLogin 
        ? `/api/auth/login/${authMode}`
        : `/api/auth/register/${authMode}`;

      const payload = authMode === 'standard'
        ? {
            userName: formData.userName,
            password: formData.password,
          }
        : {
            userName: formData.userName,
            zkProof: generateZkProof(formData.userName),
          };

      const response = await axios.post(`${BASE_URL}${endpoint}`, payload, {
        headers: { 'Content-Type': 'application/json' },
        validateStatus: (status) => status < 500,
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success(isLogin ? 'Login successful!' : 'Registration successful!');
        if (isLogin) {
          localStorage.setItem('accessToken', response.data?.accessToken);
          window.location.href = '/';
        } else {
          setIsLogin(true);
          setFormData({ userName: '', password: '' });
        }
      } else {
        handleErrorResponse(response);
      }
    } catch (error) {
      if (error.response) {
        handleErrorResponse(error.response);
      } else {
        toast.error('Unexpected error. Try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleErrorResponse = (response) => {
    const serverError = response.data?.error || response.data?.message;
    if (response.status === 400 || response.status === 409) {
      if (serverError?.toLowerCase().includes('username')) {
        setErrors(prev => ({ ...prev, userName: serverError }));
      } else if (serverError?.toLowerCase().includes('password')) {
        setErrors(prev => ({ ...prev, password: serverError }));
      }
      toast.error(serverError);
    } else if (response.status === 500) {
      toast.error('Server error. Try again later.');
    } else {
      toast.error(`Error: ${response.status}`);
    }
  };

  return (
    <div className="flex flex-col justify-center container py-12 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-medium text-white">
          {isLogin ? 'Log in to your account' : 'Create a new account'}
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

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                required
                value={formData.userName}
                onChange={handleChange}
                disabled={isLoading}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.userName ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
              />
              {errors.userName && <p className="mt-1 text-sm text-red-600">{errors.userName}</p>}
            </div>

            {authMode === 'standard' && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : isLogin ? 'Log in' : 'Register'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              className="font-medium text-teal-600 hover:text-teal-500"
              disabled={isLoading}
            >
              {isLogin ? 'Need to create an account?' : 'Already have an account? Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
