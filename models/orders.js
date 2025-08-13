const DataTypes = require('sequelize');

const sequelize = require('../webServer/db/sequelize');

module.exports = sequelize.connect.define('orders', { // 账单
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
  companyid: { // 公司id
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  contractid: { // 合约id
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  money: { // 资金变动
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  orderstr: { // 账单备注字符串
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  timestamp: { // 支付时间
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0,
  },
  endtimestamp: { // 结清时间
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0,
  },
  statu: { // 状态
    type: DataTypes.INTEGER,
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
