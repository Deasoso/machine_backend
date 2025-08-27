const verifyer = require('./verifyer');

const fs = require('fs');
const qiniu = require('qiniu');

const accessKey = '4BnwRDNlcVvIFnAsc-3tAnRRwa4y_nXsGpAPyYf4';
const secretKey = 'KGcPTWECMajGAmQK0gZaaWKkrmuMEo-NqndkVRng';

exports.userUploadPicture = async function userUploadPicture(ctx) {
  // 由于各个仓库共用七牛云密钥，所以图片统一由个人服务器上传
  const loginkey = await verifyer.verifysuperadmin(ctx, ctx.header.token, 0);

  const file = ctx.request.files.file;
  ctx.assert(file, 500, '未检测到文件');

  const filenamearr = file.originalFilename.split('.');
  const fileName = "machinepic/" + 'user' + loginkey.adminid + 'picture' + new Date().getTime() + '.' + filenamearr[filenamearr.length - 1];

  // 创建文件可读流
  const fileStream = await fs.createReadStream(file.filepath);
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

  const scopename = `mjqzpic:${fileName}`;
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: scopename, // 自行选择自己对应的bucket
  });
  const uploadToken = putPolicy.uploadToken(mac);
  const config = new qiniu.conf.Config();

  // 空间对应的机房 一定要按自己属区Zone对象
  config.zone = qiniu.zone.Zone_z2;
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();

  const backget = await new Promise((resolved, reject) => {
    // 以文件流的形式进行上传
    // uploadToken是token， key是上传到七牛后保存的文件名, localFile是流文件
    // putExtra是上传的文件参数，采用源码中的默认参数
    formUploader.putStream(uploadToken, fileName, fileStream, putExtra, (respErr, respBody, respInfo) => {
      if (respErr) {
        ctx.assert(false, 500, '上传图片失败');
        reject(respErr);
      } else {
        resolved(respBody);
      }
    });
  });

  const DownloadUrl = `http://yuezhuopic.deaso40.com/${fileName}`;
  
  ctx.body = { picurl: DownloadUrl };
}