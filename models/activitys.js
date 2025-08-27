const DataTypes = require('sequelize');

const sequelize = require('../webServer/db/sequelize');

module.exports = sequelize.connect.define('activitys', { // 活动
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
  adminidlist: { // 活动执行人列表
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
    defaultValue: [],
  },
  name: { // 名称
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  machineidlist: { // 设备列表
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
    defaultValue: [],
  },
  statu: { // 状态，0未开始，1进行中，2已结束
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  imageurl: { // 图片
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  token: { // token
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
