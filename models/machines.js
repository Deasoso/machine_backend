const DataTypes = require('sequelize');

const sequelize = require('../webServer/db/sequelize');

module.exports = sequelize.connect.define('machines', { // 设备
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
  name: { // 名称
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  ip: { // 设备ip
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  actionlist: { // 动作编号列表
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: [],
  },
  statu: { // 状态，01启用中，2已弃用
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
