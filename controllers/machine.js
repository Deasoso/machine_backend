const db = require('../webServer/db');
const DataTypes = require('sequelize');
const Op = DataTypes.Op;

const models = db.models;
const verifyer = require('./verifyer');

exports.add = async function add(ctx) {
  const loginkey = await verifyer.verifyadmin(ctx, ctx.header.token, 0);
  if(ctx.request.body.obj.id){
    const have = await models.machines.find({
      where: { id: ctx.request.body.obj.id }
    });
    ctx.assert(have, 500, '修改对象不存在');
    ctx.assert(have.adminid == loginkey.adminid, 500, '权限不足');
    await models.machines.update({
      name: ctx.request.body.obj.name || have.name,
      type: ctx.request.body.obj.type || have.type,
      ip: ctx.request.body.obj.ip || have.ip,
      actionlist: ctx.request.body.obj.actionlist || have.actionlist,
      statu: ctx.request.body.obj.statu || have.statu,
      tip: ctx.request.body.obj.tip || have.tip,
    }, {
      where: {
        id: ctx.request.body.obj.id,
      },
    });
  }else{
    await models.machines.create({
      adminid: loginkey.adminid,
      name: ctx.request.body.obj.name,
      type: ctx.request.body.obj.type,
      ip: ctx.request.body.obj.ip,
      actionlist: ctx.request.body.obj.actionlist,
      statu: ctx.request.body.obj.statu,
      tip: ctx.request.body.obj.tip,
    });
  }
  ctx.body = { message: 'success' };
};

exports.search = async function search(ctx) {
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
      adminid: loginkey.adminid
    }
  };
  for (const index in ctx.request.body.searchObj) {
    if (models.machines.attributes[index].type instanceof DataTypes.STRING) {
      searchObj.where[index] = {
        [Op.like]: `%${ctx.request.body.searchObj[index]}%`,
      };
    } else {
      searchObj.where[index] = ctx.request.body.searchObj[index];
    }
  }
  const result = await models.machines.findAndCountAll(searchObj);
  ctx.body = { result };
};
