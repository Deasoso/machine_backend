const DataTypes = require('sequelize');

const sequelize = require('../webServer/db/sequelize');

module.exports = sequelize.connect.define('bankorders', { // 银行账单
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  adminid: { // 用户id，如果人操作的话
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  companyid: { // 公司id
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  orderid: { // 账单id
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  bankcardid: { // 银行卡id
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  name: { // 名称
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  payername: { // 支付人名
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  gettername: { // 收取人名
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  contenttext: { // 备注内容
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  bankorderid: { // 银行的账单id
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  money: { // 资金变动
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  timestamp: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0,
  },
  nonce_str: { // 预留
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  statu: { // 支付状态
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
