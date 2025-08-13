const DataTypes = require('sequelize');

const sequelize = require('../webServer/db/sequelize');

module.exports = sequelize.connect.define('contracts', { // 合约
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
  money: { // 总资金
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  starttimestamp: { // 开始时间戳
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0,
  },
  endtimestamp: { // 结束时间戳
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0,
  },
  payrate: { // 支付频率，如月付，三月付
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  startstr: { // 合约开头字符串
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  title: { // 标题
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  content: { // 内容
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
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
