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
  type: { // 单点模式/排队模式
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
  iconurl: { // 图标
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  imageurl: { // 图片
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  imageurl2: { // 横版图片
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  token: { // token
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  token2: { // token
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  yposition: { // 图片距离
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  actionperrow: { // 每行图片数
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  fontsize: { // 图标文字大小
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  fontweight: { // 图标文字粗细
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  fontcolor: { // 图标文字字体
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  fontname: { // 图标文字字体
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
