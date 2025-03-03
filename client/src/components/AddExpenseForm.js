import React, { useState } from "react";
import axios from "axios";
import "../styles/ExpenseTracker.css";

const AddExpenseForm = ({ fetchExpenses }) => {
    const [newExpense, setNewExpense] = useState({
        amount: "",
        date: "",
        category: "",
        description: "",
    });

    const handleChange = (e) => {
        setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/expenses", newExpense);
            fetchExpenses();
            setNewExpense({ amount: "", date: "", category: "", description: "" });
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    return (
        <div className="form-section">
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" name="amount" value={newExpense.amount} onChange={handleChange} placeholder="Amount" required />
                <input type="date" name="date" value={newExpense.date} onChange={handleChange} required />
                <input type="text" name="category" value={newExpense.category} onChange={handleChange} placeholder="Category" required />
                <input type="text" name="description" value={newExpense.description} onChange={handleChange} placeholder="Description" />
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
};

export default AddExpenseForm;
