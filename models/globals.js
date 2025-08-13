const DataTypes = require('sequelize');

const sequelize = require('../webServer/db/sequelize');

module.exports = sequelize.connect.define('globals', { // 一些系统设置
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  key: { // 名称
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  value: { // 内容
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
