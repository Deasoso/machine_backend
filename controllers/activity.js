const db = require('../webServer/db');
const DataTypes = require('sequelize');
const Op = DataTypes.Op;

const models = db.models;
const verifyer = require('./verifyer');

exports.add = async function add(ctx) {
  const loginkey = await verifyer.verifysuperadmin(ctx, ctx.header.token, 0);
  if(ctx.request.body.obj.id){
    const have = await models.activitys.find({
      where: { id: ctx.request.body.obj.id }
    });
    ctx.assert(have, 500, '修改对象不存在');
    await models.activitys.update({
      adminidlist: ctx.request.body.obj.adminidlist || have.adminidlist,
      name: ctx.request.body.obj.name || have.name,
      machinelist: ctx.request.body.obj.machinelist || have.machinelist,
      statu: ctx.request.body.obj.statu || have.statu,
      tip: ctx.request.body.obj.tip || have.tip,
    }, {
      where: {
        id: ctx.request.body.obj.id,
      },
    });
  }else{
    await models.activitys.create({
      adminid: loginkey.adminid,
      adminidlist: ctx.request.body.obj.adminidlist || have.adminidlist,
      name: ctx.request.body.obj.name || have.name,
      machinelist: ctx.request.body.obj.machinelist || have.machinelist,
      statu: ctx.request.body.obj.statu || have.statu,
      tip: ctx.request.body.obj.tip || have.tip,
    });
  }
  ctx.body = { message: 'success' };
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
