import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

const ProductCard = ({ product, onSelect }) => {
  const handleAddToWishlist = async ({ store, price }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/wishlist/item`,
        {
          productId: product._id,
          store,
          price,
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        }
      );

      console.log(response);
      toast.success('Added to wishlist');
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Failed to add to wishlist'
      );
      console.log(error);
    }
  };

  return (
    <div
      className="border rounded p-4 hover:shadow-lg cursor-pointer"
      onClick={() => onSelect(product)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-2 text-xl font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.description}</p>
      <div className="mt-2 space-y-1">
        {product.prices.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span>{item.store}</span>
            <span>${item.price.toFixed(2)}</span>

            <button
              onClick={() =>
                handleAddToWishlist({
                  store: item.store,
                  price: item.price,
                })
              }
              className="bg-yellow-500 cursor-pointer text-white px-2 py-1 rounded"
            >
              Add To Wishlist
            </button>
          </div>
        ))}
      </div>
      <a
        href={product.productUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 text-sm mt-2 inline-block"
      >
        View on Store
      </a>
    </div>
  );
};

export default ProductCard;
