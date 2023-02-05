const express = require("express");
const tasks = require('./routes/tasks')
const notFound = require("./middleware/not-found")
const {errorHandlerMiddleware} = require("./middleware/error-handler")

const app = express();
const db = require("./db/connect")
require('dotenv').config()


app.use(express.json());
app.use(express.static('./public'))

app.get('/',(req,res)=>{
    res.send("Task Manager App")
})

app.use('/api/v1/tasks',tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)




port = 3000
const start = async()=>{
    try {
        await db(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`Server is Listening on http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()


