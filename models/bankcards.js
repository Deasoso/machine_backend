const DataTypes = require('sequelize');

const sequelize = require('../webServer/db/sequelize');

module.exports = sequelize.connect.define('bankcards', { // 银行卡
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
  companyid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  name: { // 银行卡名称
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  bankcardid: { // 银行的卡唯一id
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  money: { // 创建后总资金
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  statu: { // 状态
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  timestamp: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0,
  },
  tip: { // 备注
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
}, {
  freezeTableName: true,
});
