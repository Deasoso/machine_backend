const db = require('../webServer/db');
const DataTypes = require('sequelize');
const Op = DataTypes.Op;

const models = db.models;
const verifyer = require('./verifyer');

exports.add = async function add(ctx) {
  const loginkey = await verifyer.verifysuperadmin(ctx, ctx.header.token, 0);
  if(ctx.request.body.obj.id){
    const have = await models.globals.find({
      where: { id: ctx.request.body.obj.id }
    });
    ctx.assert(have, 500, '修改对象不存在');
    await models.globals.update({
      key: ctx.request.body.obj.key,
      value: ctx.request.body.obj.value,
      tip: ctx.request.body.obj.tip,
    }, {
      where: {
        id: ctx.request.body.obj.id,
      },
    });
  }else{
    await models.globals.create({
      key: ctx.request.body.obj.key,
      value: ctx.request.body.obj.value,
      tip: ctx.request.body.obj.tip,
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
    where: { }
  };
  for (const index in ctx.request.body.searchObj) {
    if (models.globals.attributes[index].type instanceof DataTypes.STRING) {
      searchObj.where[index] = {
        [Op.like]: `%${ctx.request.body.searchObj[index]}%`,
      };
    } else {
      searchObj.where[index] = ctx.request.body.searchObj[index];
    }
  }
  const result = await models.globals.findAndCountAll(searchObj);
  ctx.body = { result };
};