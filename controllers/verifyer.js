// 此文件不用于暴露接口，仅仅内部使用用于认证登录状态。
const db = require('../webServer/db');

const models = db.models;

exports.verifyadmin = async function verifyadmin(ctx, back_key_input, usertype) {
  // 认证是否登录
  const loginkey = await models.adminloginkeys.find({
    where: {
      type: usertype,
      accesskey: back_key_input
    },
  });
  ctx.assert(loginkey, 500, '登录信息失效');
  return loginkey;
};

exports.verifysuperadmin = async function verifysuperadmin(ctx, back_key_input, usertype) {
  // 认证是否登录
  const loginkey = await models.adminloginkeys.find({
    where: {
      type: usertype,
      accesskey: back_key_input
    },
  });
  ctx.assert(loginkey, 500, '登录信息失效');
  ctx.assert(loginkey.adminid == 0, 500, '登录信息失效');
  return loginkey;
};