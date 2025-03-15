import React from 'react';

const Footer = () => (
  <footer className="bg-gray-100 py-4 mt-8">
    <div className="container mx-auto text-center text-gray-600">
      &copy; {new Date().getFullYear()} Grocery Price Comparison
    </div>
  </footer>
);

export default Footer;
