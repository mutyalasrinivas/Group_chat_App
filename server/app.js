
const express = require('express');
const bodyParser = require('body-parser');

const sequelize=require('./utils/database');
const User=require("./models/users");
const chats=require('./models/chat');
const Group = require('./models/group');
const usergroup = require('./models/usergroup');


var cors =require('cors');

const app = express();

app.use(cors());

const userRoutes = require('./routes/users');
const chatRoute=require("./routes/chat")
const groupRoute = require('./routes/group');
const groupChatRoute = require('./routes/groupchat');

app.use(bodyParser.json({ extended: false }));
 



app.use(userRoutes);
 
app.use('/users',chatRoute)
app.use(groupRoute);
app.use(groupChatRoute);


User.hasMany(chats)
chats.belongsTo(User)

User.belongsToMany(Group, {through:'usergroup',foreignKey: 'signupId'});
Group.belongsToMany(User,{through:'usergroup',foreignKey: 'groupId'})



sequelize
.sync({alter:true})
 
.then(result=>{
   app.listen(2000);
})
.catch(err=>{
    console.log(err);
}); 