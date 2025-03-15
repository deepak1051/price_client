import React from 'react';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    const result = await login(credentials);
    if (result.success) {
      navigate('/');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Login;
