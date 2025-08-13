const DataTypes = require('sequelize');

const sequelize = require('../webServer/db/sequelize');

module.exports = sequelize.connect.define('adminloginkeys', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  adminid: { // 用户id
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  type: { // 类型，暂时没用
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  accesskey: { // 登录凭证
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  accesstime: { // 登录时间
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
