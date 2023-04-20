const express = require('express');
const port=2000;
const sequelize = require('./utils/database');
const userControllers = require('./controllers/users');
const userRoutes = require("./routes/users")
const userModels=require("./models/users");
const cors= require('cors');

const app=express();
app.use(cors());
app.use(express.json());
app.use(userRoutes);



sequelize.sync()
.then(()=>{
    app.listen(port,()=>{
        console.log("server running at ",port)
    })
})
.catch((err)=>{
    console.log(err);
})

 