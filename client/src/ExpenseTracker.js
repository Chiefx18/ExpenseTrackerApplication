import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpenseList from "./components/ExpenseList";
import AddExpenseForm from "./components/AddExpenseForm";
import TotalExpenseForm from "./components/TotalExpenseForm";
import "./styles/ExpenseTracker.css";

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [dateFilter, setDateFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const fetchExpenses = async () => {
        try {
            let url = "http://localhost:4000/expenses";
            let params = {};
    
            if (dateFilter) params.date = dateFilter;
            if (categoryFilter) params.category = categoryFilter;
    
            const response = await axios.get(url, { params }); 
            setExpenses(response.data.data); 
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };
    
    useEffect(() => {
        fetchExpenses();
    }, [dateFilter, categoryFilter]); 

    return (
        <div className="container">
            <ExpenseList expenses={expenses} dateFilter={dateFilter} setDateFilter={setDateFilter} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
            <div className="right">
                <AddExpenseForm fetchExpenses={fetchExpenses} />
                <TotalExpenseForm />
            </div>
        </div>
    );
};

export default ExpenseTracker;
