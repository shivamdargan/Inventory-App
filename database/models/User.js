const {DataTypes } = require('sequelize');
const sequelize = require('../dbConfig')

const User = sequelize.define('User', {
    user_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });
  
  // (async () => {
  //   await sequelize.sync({ force: true });
  //   // Code here
  // })();

  module.exports = User