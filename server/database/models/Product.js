const {DataTypes } = require('sequelize');
const sequelize = require('../dbConfig')
const Product = sequelize.define('Product', {
    product_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productDetails: {
      type: DataTypes.STRING,
      allowNull: true
    },
    productImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    productPrice:{
      type:DataTypes.STRING,
      allowNull:false
    },
    productQuantity : {
      type:DataTypes.STRING,
      allowNull:false
    },
    productOwnerId:{
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
  
  module.exports = Product