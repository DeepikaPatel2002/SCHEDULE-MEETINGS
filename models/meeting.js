
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../utils/db-connection');

const Meeting = sequelize.define('meeting', {
    id: { type: DataTypes.INTEGER, 
        autoIncrement: true, primaryKey: true 
    },

    userName: { type: DataTypes.STRING,
         allowNull: false },

    userEmail: { type: DataTypes.STRING, allowNull: false

     },
    slotTime: { type: DataTypes.STRING, allowNull:
         false
         },

    slotId: { type: DataTypes.INTEGER, 
        allowNull: false
     },
     
    //  meetingLink:{
    //     type:Sequelize.STRING,
    //     allowNull:true
    //  }

    
});

module.exports = Meeting;