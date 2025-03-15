import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import WishlistCard from './WishlistCard';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/wishlist');
      setWishlist(response.data);
    } catch (error) {
      console.log(error);
      console.error('Error fetching wishlist');
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const markPurchased = async (itemId, purchased) => {
    try {
      await axios.put(`http://localhost:5000/api/wishlist/item/${itemId}`, {
        purchased,
      });
      fetchWishlist();

      toast.success(
        'Item marked as ' + (purchased ? 'purchased' : 'not purchased')
      );
    } catch (error) {
      toast.error(
        'Failed to mark item as ' + (purchased ? 'purchased' : 'not purchased')
      );
      console.log(error);
      console.error('Error updating wishlist item');
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/wishlist/item/${itemId}`);
      fetchWishlist();
    } catch (error) {
      console.log(error);
      console.error('Error removing wishlist item');
    }
  };

  return (
    <div>
      {/* <h2 className="text-xl font-bold mb-4">Wishlist</h2>
      {wishlist.map((monthData) => (
        <div key={monthData.month} className="mb-6">
          <h3 className="text-lg font-semibold">{monthData.month}</h3>
          <ul className="space-y-2">
            {monthData.items.map((item) => (
              <li
                key={item._id}
                className="border p-2 rounded flex justify-between items-center"
              >
                <div>
                  <p>{item.name}</p>
                  <p className="text-xs text-gray-500">Store: {item.store}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => markPurchased(item._id, !item.purchased)}
                    className="text-sm text-green-500"
                  >
                    {item.purchased ? 'Unmark' : 'Mark Purchased'}
                  </button>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-sm text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))} */}

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Wishlist
      </h2>

      {wishlist.map((monthData) => (
        <WishlistCard
          key={monthData.month}
          monthData={monthData}
          markPurchased={markPurchased}
          removeItem={removeItem}
        />
      ))}
    </div>
  );
};

export default Wishlist;
