const DataTypes = require('sequelize');

const sequelize = require('../webServer/db/sequelize');

module.exports = sequelize.connect.define('companys', { // 公司
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  adminid: { // 创建用户id
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  name: { // 公司名
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  fullname: { // 公司全名，预留
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  money: { // 总资金
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  timestamp: { // 创建时间
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0,
  },
  statu: { // 状态，0正常，1冻结，2注销
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
