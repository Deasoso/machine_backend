const db = require('../webServer/db');
const DataTypes = require('sequelize');
const Op = DataTypes.Op;

const models = db.models;
const verifyer = require('./verifyer');

exports.add = async function add(ctx) {
  const loginkey = await verifyer.verifysuperadmin(ctx, ctx.header.token, 0);
  if(ctx.request.body.obj.id){
    const have = await models.contracts.find({
      where: { id: ctx.request.body.obj.id }
    });
    ctx.assert(have, 500, '修改对象不存在');
    // if(have.statu == 0){
      await models.contracts.update({
        adminid: loginkey.adminid,
        companyid: ctx.request.body.obj.companyid || have.companyid,
        starttimestamp: ctx.request.body.obj.starttimestamp || have.starttimestamp,
        endtimestamp: ctx.request.body.obj.endtimestamp || have.endtimestamp,
        payrate: ctx.request.body.obj.payrate || have.payrate,
        startstr: ctx.request.body.obj.startstr || have.startstr,
        title: ctx.request.body.obj.title || have.title,
        content: ctx.request.body.obj.content || have.content,
        statu: ctx.request.body.obj.statu || have.statu,
        tip: ctx.request.body.obj.tip || have.tip,
        timestamp: new Date().getTime(),
      }, {
        where: {
          id: ctx.request.body.obj.id,
        },
      });
      for(var index1 in ctx.request.body.orderlist1){
        await models.orders.create({
          adminid: loginkey.adminid,
          companyid: ctx.request.body.obj.companyid,
          contractid: ctx.request.body.obj.id,
          orderstr: ctx.request.body.orderlist1[index1].orderstr,
          money: ctx.request.body.orderlist1[index1].money,
          tip: ctx.request.body.orderlist1[index1].tip,
          timestamp: ctx.request.body.orderlist1[index1].timestamp,
        });
      }
      for(var index2 in ctx.request.body.orderlist2){
        await models.orders.create({
          adminid: loginkey.adminid,
          companyid: ctx.request.body.obj.companyid,
          contractid: ctx.request.body.obj.id,
          orderstr: ctx.request.body.orderlist1[index2].orderstr,
          money: ctx.request.body.orderlist1[index2].money,
          tip: ctx.request.body.orderlist1[index2].tip,
          timestamp: ctx.request.body.orderlist1[index2].timestamp,
        });
      }
    // }else{
    //   await models.contracts.update({
    //     title: ctx.request.body.title || have.title,
    //     content: ctx.request.body.content || have.content,
    //     statu: ctx.request.body.statu || have.statu,
    //   }, {
    //     where: {
    //       id: ctx.request.body.id,
    //     },
    //   });
    // }
  }else{
    await models.contracts.create({
      adminid: loginkey.adminid,
      companyid: ctx.request.body.obj.companyid,
      starttimestamp: ctx.request.body.obj.starttimestamp,
      endtimestamp: ctx.request.body.obj.endtimestamp,
      payrate: ctx.request.body.obj.payrate,
      startstr: ctx.request.body.obj.startstr,
      title: ctx.request.body.obj.title,
      content: ctx.request.body.obj.content,
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
    where: {
      statu: {
        [Op.not]: 0
      }
    }
  };
  for (const index in ctx.request.body.searchObj) {
    if (models.contracts.attributes[index].type instanceof DataTypes.STRING) {
      searchObj.where[index] = {
        [Op.like]: `%${ctx.request.body.searchObj[index]}%`,
      };
    } else {
      searchObj.where[index] = ctx.request.body.searchObj[index];
    }
  }
  const result = await models.contracts.findAndCountAll(searchObj);
  ctx.body = { result };
};

exports.init = async function init(ctx) {
  const loginkey = await verifyer.verifysuperadmin(ctx, ctx.header.token, 0);
  const newcontract = await models.contracts.create({
    adminid: loginkey.adminid,
  });
  ctx.body = { newcontract };
};
