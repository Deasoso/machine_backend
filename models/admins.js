const DataTypes = require('sequelize');

const sequelize = require('../webServer/db/sequelize');

module.exports = sequelize.connect.define('admins', { // 管理员
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  avatar: { // 头像
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  name: { // 名称
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  level: { // 权限等级
    type: DataTypes.INTEGER,
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
