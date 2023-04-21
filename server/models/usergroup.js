const Sequelize=require('sequelize');
const sequelize=require('../utils/database');
const user = require('./users');

const UserGroup = sequelize.define('usergroup', {
    groupName:{
        type:Sequelize.STRING,
        allowNull:false
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false
      },

  signupId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  admin:Sequelize.BOOLEAN
});


module.exports = UserGroup;