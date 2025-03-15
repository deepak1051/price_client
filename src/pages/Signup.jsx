import React from 'react';
import SignupForm from '../components/SignupForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    const result = await signup(data);
    if (result.success) {
      alert('Signup successful. Please login.');
      navigate('/login');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignupForm onSignup={handleSignup} />
    </div>
  );
};

export default Signup;
