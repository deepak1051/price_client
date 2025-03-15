import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import toast from 'react-hot-toast';

const ProductSearch = ({ onProductSelect }) => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);

  const [stockProducts, setStockProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setStockProducts(response.data);
      } catch (error) {
        console.log(error);
        toast.error('Error fetching products');
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/search?query=${query}`
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      alert('Error fetching products');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex  flex-wrap gap-2">
        {stockProducts.length > 0 &&
          stockProducts?.map((item) => {
            return (
              <div
                key={item?._id}
                className="border p-2 shadow-sm rounded cursor-pointer"
                onClick={() => setQuery(item?.name)}
              >
                {item?.name}
              </div>
            );
          })}
      </div>

      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search for groceries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onSelect={onProductSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;
