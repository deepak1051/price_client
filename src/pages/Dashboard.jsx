import React, { useState } from 'react';
import ProductSearch from '../components/ProductSearch';
import Wishlist from '../components/Wishlist';
import BudgetTracker from '../components/BudgetTracker';

const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <ProductSearch onProductSelect={setSelectedProduct} />
      {selectedProduct && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Product Details</h2>
          <p>{selectedProduct.description}</p>
          {/* Display additional product details as needed */}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Wishlist />
        <BudgetTracker />
      </div>
    </div>
  );
};

export default Dashboard;
