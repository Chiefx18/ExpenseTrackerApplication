import React, { useState } from "react";
import axios from "axios";
import "../styles/ExpenseTracker.css";

const TotalExpenseForm = () => {
    const [dateRange, setDateRange] = useState({ startDate: "", endDate: "", category: "" });
    const [totalExpense, setTotalExpense] = useState(null);

    const handleChange = (e) => {
        setDateRange({ ...dateRange, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(dateRange);
            const response = await axios.get("http://localhost:4000/expenses/total", { params: dateRange });
            console.log(response);
            setTotalExpense(response.data.data.total_expenses);
        } catch (error) {
            console.error("Error calculating total expenses:", error);
        }
    };

    return (
        <div className="form-section">
            <h2>Find Total Expense</h2>
            <form onSubmit={handleSubmit}>
                <input type="date" name="startDate" value={dateRange.startDate} onChange={handleChange} required />
                <input type="date" name="endDate" value={dateRange.endDate} onChange={handleChange} required />
                <input type="text" name="category" value={dateRange.category} onChange={handleChange} placeholder="Category (Optional)" />
                <button type="submit">Calculate</button>
            </form>
            {totalExpense !== null && <h3>Total Expense: ₹{totalExpense}</h3>}
        </div>
    );
};

export default TotalExpenseForm;
