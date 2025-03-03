// Imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const expensesRoutes = require('./routes/expenses.routes');

// Load env 
dotenv.config();

// Initialize app
const app = express();
app.use(express.json());

// Connect db
const db = require('./db');

//Get Ports
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// enable cors for react app 
app.use(cors({ origin: `${FRONTEND_URL}` }));

//Routes
app.use('/expenses',expensesRoutes)

// Health Route
app.get('/',(req,res)=>{
    res.send('App is working')
})

// Connect DB and Listen app 
db.sequelize.sync().then(()=>{
    console.log('Database connected successfully')
    app.listen(PORT,()=>{
        console.log(`App is running on Port ${PORT}`);
    })
})
