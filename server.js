const express = require('express')

const dotenv = require('dotenv')

const {connectDb} = require('./config/db')

const tasksroutes = require('./routes/tasks.routes')

dotenv.config()

const app = express()

app.use(express.json())

app.use('/api',tasksroutes)

const Port = 5000||process.env.Port

app.listen(Port,()=>{
    try {
            connectDb();
            console.log(`Server Running at port ${Port}`);
    } catch (error) {
        console.log(error.message);
    }
    
})