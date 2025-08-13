const DataTypes = require('sequelize');

const sequelize = require('../webServer/db/sequelize');

module.exports = sequelize.connect.define('adminsecrets', { // 密码
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  adminid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  username: { // 用户名
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  password: { // 密码
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  tip: { // 备注
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
}, {
  freezeTableName: true,
});
