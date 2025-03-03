const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const db = require('./db');
const PORT = 4000;
app.use(cors({ origin: "http://localhost:3000" }));
const expensesRoutes = require('./routes/expenses.routes');

app.use('/expenses',expensesRoutes)

app.get('/',(req,res)=>{
    res.send('App is working')
})

db.sequelize.sync().then(()=>{
    console.log('Database connected successfully')
    app.listen(PORT,()=>{
        console.log(`App is running on Port ${PORT}`);
    })
})
