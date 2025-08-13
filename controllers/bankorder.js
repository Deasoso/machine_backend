const db = require('../webServer/db');
const DataTypes = require('sequelize');
const Op = DataTypes.Op;

const models = db.models;
const verifyer = require('./verifyer');

exports.add = async function add(ctx) {
  const loginkey = await verifyer.verifysuperadmin(ctx, ctx.header.token, 0);
  if(ctx.request.body.obj.id){
    const have = await models.bankorders.find({
      where: { id: ctx.request.body.obj.id }
    });
    ctx.assert(have, 500, '修改对象不存在');
    await models.bankorders.update({ // 银行账单可以调整公司银行卡id等
      companyid: ctx.request.body.obj.companyid || have.companyid,
      orderid: ctx.request.body.obj.orderid || have.orderid,
      bankcardid: ctx.request.body.obj.bankcardid || have.bankcardid,
      name: ctx.request.body.obj.name || have.name,
      statu: ctx.request.body.obj.statu || have.statu,
      tip: ctx.request.body.obj.tip || have.tip,
    }, {
      where: {
        id: ctx.request.body.obj.id,
      },
    });
  }else{
    await models.bankorders.create({
      adminid: loginkey.adminid,
      companyid: ctx.request.body.obj.companyid,
      orderid: ctx.request.body.obj.orderid,
      bankcardid: ctx.request.body.obj.bankcardid,
      name: ctx.request.body.obj.name,
      payername: ctx.request.body.obj.payername,
      gettername: ctx.request.body.obj.gettername,
      contenttext: ctx.request.body.obj.contenttext,
      bankorderid: ctx.request.body.obj.bankorderid,
      nonce_str: ctx.request.body.obj.nonce_str,
      statu: ctx.request.body.obj.statu,
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
    if (models.bankorders.attributes[index].type instanceof DataTypes.STRING) {
      searchObj.where[index] = {
        [Op.like]: `%${ctx.request.body.searchObj[index]}%`,
      };
    } else {
      searchObj.where[index] = ctx.request.body.searchObj[index];
    }
  }
  const result = await models.bankorders.findAndCountAll(searchObj);
  ctx.body = { result };
};
