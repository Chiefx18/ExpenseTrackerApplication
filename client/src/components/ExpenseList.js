import React from "react";
import "../styles/ExpenseTracker.css";

const ExpenseList = ({ expenses, dateFilter, setDateFilter, categoryFilter, setCategoryFilter }) => {
    return (
        <div className="left">
            <h2>All Expenses</h2>
            <div className="filters">
                <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    placeholder="Filter by Date"
                />
                <input
                    type="text"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    placeholder="Filter by Category"
                />
            </div>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id}>
                        {expense.date} - {expense.category} - ₹{expense.amount} - {expense.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
