const express = require('express');
const port=2000;
const sequelize = require('./utils/database');
const userControllers = require('./controllers/users');
const userRoutes = require("./routes/users")
const userModels=require("./models/users");
const cors= require('cors');
const jwt = require('jsonwebtoken');
const chats = require('./models/chat');
const User = require('./models/users');
const chatRoutes = require('./routes/chat');

const app=express();
app.use(cors({
    origin:" * "
}));
app.use(express.json());
app.use(userRoutes);
app.use('/users',chatRoutes);

User.hasMany(chats);
chats.belongsTo(User);

sequelize.sync()

.then(()=>{
    app.listen(port,()=>{
        console.log("server running at ",port)
    })
})
.catch((err)=>{
    console.log(err);
})

 