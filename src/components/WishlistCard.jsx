import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api';

export default function WishlistCard({ monthData, markPurchased, removeItem }) {
  const [budgetSummary, setBudgetSummary] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const getBudgetSummary = async (month, year) => {
    try {
      const resp = await axios.get(
        `${API_BASE_URL}/api/budget/summary/${month}/${year}`
      );
      setBudgetSummary(resp.data);
    } catch (error) {
      console.error('Error fetching budget summary', error);
    }
  };

  useEffect(() => {
    getBudgetSummary(monthData.month, monthData.year);
  }, [monthData.month, monthData.year]);

  return (
    <div className="mb-8 bg-gray-100 rounded-lg shadow-md">
      {/* Month Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer text-lg font-semibold text-gray-700 bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-t-lg flex justify-between items-center"
      >
        <span>
          {monthData.month} {monthData.year}
        </span>
        <span className="text-sm font-medium text-white">
          {isExpanded ? 'Collapse' : 'Expand'}
        </span>
      </div>

      {/* Budget Summary */}
      {budgetSummary && (
        <div className="p-4 bg-white border-b rounded-t-lg shadow-sm">
          <p className="text-gray-800 font-medium">
            Budget: ${budgetSummary.budget.toFixed(2)}
          </p>
          <p className="text-gray-500">
            Total Purchased: ${budgetSummary.totalPurchasedAmount.toFixed(2)}
          </p>
          <p className="text-gray-500">
            Remaining Budget: ${budgetSummary.remainingBudget.toFixed(2)}
          </p>
        </div>
      )}

      {/* Collapsible Content */}
      {isExpanded && (
        <ul className="space-y-3 mt-3 p-4 bg-white rounded-b-lg shadow-sm">
          {monthData.items.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center p-3 bg-gray-50 border rounded-lg shadow-sm transition hover:shadow-md"
            >
              {/* Item Info */}
              <div>
                <p className="text-gray-800 font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">Store: {item.store}</p>
                <p className="text-xs text-gray-500">
                  Price: ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => markPurchased(item._id, !item.purchased)}
                  className={`cursor-pointer text-xs font-semibold px-3 py-1 rounded-lg transition ${
                    item.purchased
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-yellow-500 text-black hover:bg-yellow-600'
                  }`}
                >
                  {item.purchased ? 'Unmark' : 'Mark Purchased'}
                </button>
                <button
                  onClick={() => removeItem(item._id)}
                  className="cursor-pointer text-xs font-semibold px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
