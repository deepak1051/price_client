import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-8 space-y-4 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
