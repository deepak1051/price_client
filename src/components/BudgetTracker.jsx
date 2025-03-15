import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';

const BudgetTracker = () => {
  const [budgetData, setBudgetData] = useState([]);
  const [newBudget, setNewBudget] = useState('');
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2025);

  const fetchBudget = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/budget`);

      console.log('response', response);
      setBudgetData(response.data);
    } catch (error) {
      console.log(error);
      console.error('Error fetching budget');
    }
  };

  useEffect(() => {
    fetchBudget();
  }, []);

  const handleBudgetUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/budget`, {
        amount: parseFloat(newBudget),
        month,
        year,
      });
      fetchBudget();
      setNewBudget('');
    } catch (error) {
      console.log(error);
      console.error('Error updating budget');
    }
  };

  console.log('budget data', budgetData);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Monthly Budget Tracker</h2>

      {/* <div>
        {budgetData?.map((item) => {
          return (
            <div>
              <p className="text-lg">user: {item.user}</p>
              <p className="text-lg">month: {item.month}</p>
              <p className="text-lg">year: {item.year}</p>
              <p className="text-lg">amount: {item.amount}</p>
            </div>
          );
        })}
      </div> */}
      {/* <div className="mb-4">
        <p className="text-lg">Budget: ${budgetData.budget.toFixed(2)}</p>
        <p className="text-lg">Spent: ${budgetData.spent.toFixed(2)}</p>
        <p className="text-lg">
          Remaining: ${(budgetData.budget - budgetData.spent).toFixed(2)}
        </p>
      </div> */}
      <form onSubmit={handleBudgetUpdate} className="flex space-x-2">
        <input
          type="number"
          placeholder="Set Budget"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
          className="border px-3 py-2 rounded"
          step="0.01"
          min="0"
        />

        <div>
          <label>Month</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        <div>
          <label>Year</label>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default BudgetTracker;
