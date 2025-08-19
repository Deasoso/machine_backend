const DataTypes = require('sequelize');

const sequelize = require('../webServer/db/sequelize');

module.exports = sequelize.connect.define('actions', { // 动作
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
  actionid: { // 执行id
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  imageurl: { // 大图像
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  iconurl: { // 小图标
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
