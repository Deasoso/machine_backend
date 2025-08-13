const db = require('../webServer/db');
const DataTypes = require('sequelize');
const Op = DataTypes.Op;

const models = db.models;
const verifyer = require('./verifyer');

exports.add = async function add(ctx) {
  const loginkey = await verifyer.verifysuperadmin(ctx, ctx.header.token, 0);
  if(ctx.request.body.obj.id){
    const have = await models.companys.find({
      where: { id: ctx.request.body.obj.id }
    });
    ctx.assert(have, 500, '修改对象不存在');
    await models.companys.update({
      name: ctx.request.body.obj.name || have.name,
      fullname: ctx.request.body.obj.fullname || have.fullname,
      statu: ctx.request.body.obj.statu || have.statu,
      tip: ctx.request.body.obj.tip || have.tip,
    }, {
      where: {
        id: ctx.request.body.obj.id,
      },
    });
  }else{
    await models.companys.create({
      adminid: loginkey.adminid,
      name: ctx.request.body.obj.name,
      fullname: ctx.request.body.obj.fullname,
      tip: ctx.request.body.obj.tip,
      timestamp: new Date().getTime(),
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
    if (models.companys.attributes[index].type instanceof DataTypes.STRING) {
      searchObj.where[index] = {
        [Op.like]: `%${ctx.request.body.searchObj[index]}%`,
      };
    } else {
      searchObj.where[index] = ctx.request.body.searchObj[index];
    }
  }
  const result = await models.companys.findAndCountAll(searchObj);
  ctx.body = { result };
};
