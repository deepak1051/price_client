import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-xl font-bold">
          Grocery Compare
        </Link>
        <nav className="space-x-4">
          {user ? (
            <>
              <span>Welcome, {user.name || user.email}</span>
              <button onClick={logout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
              <Link to="/signup" className="text-blue-500">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
