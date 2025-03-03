const { expenses } = require('../db');
const { Op }= require('sequelize');
const expensesService = {};

expensesService.addNewExpense = async (data) =>{
    try{
        const expense = await expenses.create({
            amount: data.amount,
            category: data.category,
            date: data.date,
            description: data.description,
            }
        )
        return expense;
    } catch(error){
        throw new Error(error.message);
    }
}

expensesService.getAllExpenses = async (date = null, category = null) => {
    try {
        const whereCondition = {};
        if (date) {
            whereCondition.date = { [Op.eq]: date }; 
        }
        if (category) {
            whereCondition.category = category;
        }
        const allExpenses = await expenses.findAll({
            where: Object.keys(whereCondition).length ? whereCondition : {}, 
            attributes: ["id", "amount", "category", "date", "description"],
            raw: true
        });
        return allExpenses;
    } catch (error) {
        throw new Error(error.message);
    }
};
expensesService.getTotalExpenses = async (startDate, endDate, category = null) => {
    try {
        const whereCondition = {
            date: {
                [Op.between]: [startDate, endDate]
            }
        };
        if (category) {
            whereCondition.category = category;
        }
        const total = await expenses.sum("amount", { where: whereCondition });

        return total || 0; 
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = expensesService;