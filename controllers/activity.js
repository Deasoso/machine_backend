const db = require('../webServer/db');
const DataTypes = require('sequelize');
const Op = DataTypes.Op;

const models = db.models;
const verifyer = require('./verifyer');

const { randomStr } = require('./admin');

exports.add = async function add(ctx) {
  const loginkey = await verifyer.verifysuperadmin(ctx, ctx.header.token, 0);
  var newactivity = {};
  if(ctx.request.body.obj.id){
    const have = await models.activitys.find({
      where: { id: ctx.request.body.obj.id }
    });
    ctx.assert(have, 500, '修改对象不存在');
    newactivity = await models.activitys.update({
      type: ctx.request.body.obj.type || have.type,
      adminidlist: ctx.request.body.obj.adminidlist || have.adminidlist,
      name: ctx.request.body.obj.name || have.name,
      machineidlist: ctx.request.body.obj.machineidlist || have.machineidlist,
      statu: ctx.request.body.obj.statu || have.statu,
      iconurl: ctx.request.body.obj.iconurl || have.iconurl,
      imageurl: ctx.request.body.obj.imageurl || have.imageurl,
      imageurl2: ctx.request.body.obj.imageurl2 || have.imageurl2,
      yposition: ctx.request.body.obj.yposition || have.yposition,
      actionperrow: ctx.request.body.obj.actionperrow || have.actionperrow,
      fontsize: ctx.request.body.obj.fontsize || have.fontsize,
      fontweight: ctx.request.body.obj.fontweight || have.fontweight,
      fontcolor: ctx.request.body.obj.fontcolor || have.fontcolor,
      fontname: ctx.request.body.obj.fontname || have.fontname,
      tip: ctx.request.body.obj.tip || have.tip,
      token2: randomStr()
    }, {
      where: {
        id: ctx.request.body.obj.id,
      },
    });
  }else{
    newactivity = await models.activitys.create({
      adminid: loginkey.adminid,
      type: ctx.request.body.obj.type,
      adminidlist: ctx.request.body.obj.adminidlist,
      name: ctx.request.body.obj.name,
      machineidlist: ctx.request.body.obj.machineidlist,
      statu: ctx.request.body.obj.statu,
      iconurl: ctx.request.body.obj.iconurl,
      imageurl: ctx.request.body.obj.imageurl,
      imageurl2: ctx.request.body.obj.imageurl2,
      yposition: ctx.request.body.obj.yposition,
      actionperrow: ctx.request.body.obj.actionperrow,
      fontsize: ctx.request.body.obj.fontsize,
      fontweight: ctx.request.body.obj.fontweight,
      fontcolor: ctx.request.body.obj.fontcolor,
      fontname: ctx.request.body.obj.fontname,
      tip: ctx.request.body.obj.tip,
      token2: randomStr()
    });
  }
  ctx.body = { newactivity };
};

exports.search = async function search(ctx) {
  await verifyer.verifysuperadmin(ctx, ctx.header.token, 0);
  const limit = ctx.request.body.limit || 10;
  const offset = ctx.request.body.offset || 0;
  const searchObj = {
    order: [
      ['id', 'desc'],
    ],
    limit,
    offset,
    where: {}
  };
  for (const index in ctx.request.body.searchObj) {
    if (models.activitys.attributes[index].type instanceof DataTypes.STRING) {
      searchObj.where[index] = {
        [Op.like]: `%${ctx.request.body.searchObj[index]}%`,
      };
    } else {
      searchObj.where[index] = ctx.request.body.searchObj[index];
    }
  }
  const result = await models.activitys.findAndCountAll(searchObj);
  ctx.body = { result };
};

exports.adminsearch = async function adminsearch(ctx) {
  const loginkey = await verifyer.verifyadmin(ctx, ctx.header.token, 0);
  const limit = ctx.request.body.limit || 10;
  const offset = ctx.request.body.offset || 0;
  const searchObj = {
    order: [
      ['id', 'desc'],
    ],
    limit,
    offset,
    where: {
      adminidlist: {
        [Op.contains]: [loginkey.adminid]
      }
    }
  };
  for (const index in ctx.request.body.searchObj) {
    if (models.activitys.attributes[index].type instanceof DataTypes.STRING) {
      searchObj.where[index] = {
        [Op.like]: `%${ctx.request.body.searchObj[index]}%`,
      };
    } else {
      searchObj.where[index] = ctx.request.body.searchObj[index];
    }
  }
  const result = await models.activitys.findAndCountAll(searchObj);
  ctx.body = { result };
};

exports.change = async function change(ctx) {
  const loginkey = await verifyer.verifyadmin(ctx, ctx.header.token, 0);
  ctx.assert(ctx.request.body.obj.id, 500, '请输入id');
  ctx.assert(ctx.request.body.obj.statu, 500, '请输入状态');
  const have = await models.activitys.find({
    where: { id: ctx.request.body.obj.id }
  });
  ctx.assert(have, 500, '修改对象不存在');
  if(have.adminidlist.indexOf(loginkey.adminid) == -1){
    await verifyer.verifysuperadmin(ctx, ctx.header.token, 0);
  }
  if(ctx.request.body.obj.statu == 1){
    await models.activitys.update({
      statu: ctx.request.body.obj.statu,
      token: randomStr()
    }, {
      where: {
        id: ctx.request.body.obj.id,
      },
    });
  }else{
    await models.activitys.update({
      statu: ctx.request.body.obj.statu,
    }, {
      where: {
        id: ctx.request.body.obj.id,
      },
    });
  }
  
  ctx.body = { message: 'success' };
};

exports.getactions = async function getactions(ctx) {
  var activity = {}
  if(ctx.header.token){
    activity = await models.activitys.find({
      where: { token: ctx.header.token }
    });
  }else{
    activity = await models.activitys.find({
      where: { token2: ctx.header.token2 }
    });
  }
  
  ctx.assert(activity, 500, '活动不存在');
  const machines = await models.machines.findAll({
    where: { 
      id: {
        [Op.or]: [activity.machineidlist]
      } 
    }
  });
  var actions = {};
  for(const index in machines){
    const onemachine = machines[index];
    const action = await models.actions.findAll({
      where: { 
        actionid: {
          [Op.or]: [onemachine.actionlist]
        } 
      }
    });
    actions[onemachine.id] = action;
  }
  ctx.body = { actions, machines, activity };
};
