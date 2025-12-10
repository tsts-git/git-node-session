require("dotenv").config()
const express = require ('express')
const mongoose = require('mongoose')
const connectDB = require('./config/dbCon')
const cors = require("cors")
const corsOptions = require("./config/corsOptions")

const PORT = process.env.PORT || 1003
const app = express()
mongoose.connection.once('open', () => {
    console.log('connected to MongoDB');
    app.listen(PORT, ()=> console.log(`server running on ${PORT}`))
})


connectDB()

app.use(cors())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

//routes
app.get('/', (req, res)=>{
    res.send("this is the home page!!")
})


app.use("/api/product", require("./routs/ItemRout"))
app.use("/users", require("./routs/UserRout"))
app.use("/api/auth", require("./routs/authRoutes"))
app.use("/api/basket",require("./routs/BasketRout"))


mongoose.connection.once('open', () => {
    console.log('connected to MongoDB');
    app.listen(PORT, ()=> console.log(`server running on ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err);
})