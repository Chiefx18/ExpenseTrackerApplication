const expensesService = require("../services/expenses.service");

const expensesController = {}

expensesController.addExpense = async (req,res)=>{
    try{
        const {amount, category, date, description} = req.body;
        const expense = await expensesService.addNewExpense({amount, category, date, description});
        res.status(200).json({message:"Expense Added successfully", data:expense});
    } catch(error){
        res.status(500).json({error:error.message});
    }
}
expensesController.getExpenses = async (req,res)=>{
    try{
        const {date,category} =req.query;
        const allExpenses = await expensesService.getAllExpenses(date,category);
        res.status(200).json({message:"All Expenses Fetched successfully",data:allExpenses});
    } catch(error){
        res.status(500).json({error:error.message});
    }
}
expensesController.getTotalExpenses = async (req,res)=>{
    try{
        const {startDate,endDate,category} = req.query;
        const totalExpenses = await expensesService.getTotalExpenses(startDate,endDate,category);
        res.status(200).json({message:"All Expenses fetched from range successfully", data:{total_expenses:totalExpenses}});
    } catch(error){
        res.status(500).json({error:error.message});
    }
}

module.exports = expensesController;