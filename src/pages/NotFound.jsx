import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col justify-center items-center min-h-screen">
    <h1 className="text-5xl font-bold">404</h1>
    <p className="text-xl">Page Not Found</p>
    <Link to="/" className="text-blue-500 mt-4">
      Go Home
    </Link>
  </div>
);

export default NotFound;
