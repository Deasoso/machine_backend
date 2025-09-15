const db = require('../webServer/db');

const models = db.models;
const verifyer = require('./verifyer');

const DataTypes = require('sequelize');
const Op = DataTypes.Op;

const crypto = require('crypto');

const pw_secret = 'this_is_&&xiaoyuan##PW';

const superadmin_username = '18008454858';
const superadmin_pw = '30aaa3e19606aa76992be40bad4b4db6046a5981' // yijing888

exports.loginadmin = async function loginadmin(ctx) {
  ctx.assert(ctx.request.body.username, 500, '请输入用户名');
  ctx.assert(ctx.request.body.password, 500, '请输入密码');
  if(ctx.request.body.username == superadmin_username && ctx.request.body.password == superadmin_pw){
    const newaccesskey = exports.randomStr() + 0;
    const getloginkey = await models.adminloginkeys.find({
      where: {
        adminid: 0,
      },
    });
    if(!getloginkey){
      await models.adminloginkeys.create({
        adminid: 0,
        accesskey: newaccesskey,
      });
    }else{
      await models.adminloginkeys.update({
        accesskey: newaccesskey
      },{
        where: {
          id: getloginkey.id,
        },
      });
    }
    ctx.body = { token: newaccesskey };
  }else{
    const getadminsecret = await models.adminsecrets.find({
      where: {
        username: ctx.request.body.username,
        password: exports.sha1(pw_secret + ctx.request.body.password)
      },
    });
    ctx.assert(getadminsecret, 500, '用户名或密码错误');
    const newaccesskey = exports.randomStr() + getadminsecret.id;
    const getloginkey = await models.adminloginkeys.find({
      where: {
        adminid: getadminsecret.adminid,
      },
    });
    if(!getloginkey){
      await models.adminloginkeys.create({
        adminid: getadminsecret.adminid,
        accesskey: newaccesskey,
      });
    }else{
      await models.adminloginkeys.update({
        accesskey: newaccesskey
      },{
        where: {
          adminid: getadminsecret.adminid,
        },
      });
    }
    ctx.body = { token: newaccesskey };
  }
};

exports.changeadmin = async function changeadmin(ctx) {
  await verifyer.verifysuperadmin(ctx, ctx.header.token, 0);
  ctx.assert(ctx.request.body.obj, 500, '请输入修改内容');
  if(ctx.request.body.obj.id){
    const have = await models.admins.find({
      where: { id: ctx.request.body.obj.id }
    });
    ctx.assert(have, 500, '修改对象不存在');
    var createjson = {};
    for (const searchindex in ctx.request.body.obj) {
      if(!ctx.request.body.obj[searchindex] && ctx.request.body.obj[searchindex] != 0) continue;
      for(var attrindex in models.admins.attributes){
        if(models.admins.attributes[attrindex].field == searchindex){
          createjson[searchindex] = ctx.request.body.obj[searchindex]
        }
      }
    }
    await models.admins.update(createjson, {
      where: {
        id: ctx.request.body.obj.id,
      },
    });
    const newadmin = await models.adminsecrets.update({
      // username: ctx.request.body.obj.username, // 用户名无法更改
      password: exports.sha1(pw_secret + ctx.request.body.obj.password)
    }, {
      where: {
        adminid: ctx.request.body.obj.id,
      },
    });
  }else{
    const getusersecret = await models.adminsecrets.find({
      where: {
        username: ctx.request.body.obj.username,
      },
    });
    ctx.assert(!getusersecret, 500, '用户名已被占用');
    var createjson = {};
    for (const searchindex in ctx.request.body.obj) {
      if(!ctx.request.body.obj[searchindex] && ctx.request.body.obj[searchindex] != 0) continue;
      for(var attrindex in models.admins.attributes){
        if(models.admins.attributes[attrindex].field == searchindex){
          createjson[searchindex] = ctx.request.body.obj[searchindex]
        }
      }
    }
    const newadmin = await models.admins.create(createjson);
    await models.adminsecrets.create({
      adminid: newadmin.id,
      username: ctx.request.body.obj.username,
      password: exports.sha1(pw_secret + ctx.request.body.obj.password)
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
    if (models.admins.attributes[index].type instanceof DataTypes.STRING) {
      searchObj.where[index] = {
        [Op.like]: `%${ctx.request.body.searchObj[index]}%`,
      };
    } else {
      searchObj.where[index] = ctx.request.body.searchObj[index];
    }
  }
  const result = await models.admins.findAndCountAll(searchObj);
  ctx.body = { result };
};


exports.randomStr = function randomStr() { // 产生一个32位随机字符串
  let str = '';
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  for (let i = 1; i <= 32; i += 1) {
    const random = Math.floor(Math.random() * arr.length);
    str += arr[random] || 'Z';
  }
  return str;
};

exports.randomStr4 = function randomStr4() { // 产生一个32位随机字符串
  let str = '';
  const arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  for (let i = 1; i <= 4; i += 1) {
    const random = Math.floor(Math.random() * arr.length);
    str += arr[random] || '9';
  }
  return str;
};

exports.sha1 = function sha1(str) {
  return crypto.createHash('sha1').update(str).digest('hex').toUpperCase();
};