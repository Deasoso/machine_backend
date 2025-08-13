const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const Router = require('koa-oai-router');
const MiddlewarePlugin = require('koa-oai-router-middleware');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const path = require('path');
const process = require('process');
const config = require('../config');

const app = new Koa();
app.proxy = true;

app.use(cors());

if (config.env === 'dev' || process.env.DEBUG === 'true') { // 这里是调试的时候显示连接时间等
  app.use(logger());
}

console.log(path.join(__dirname, '../controllers'));
const router = new Router({
  apiDoc: path.join(__dirname, '../routers'),
  apiExplorerVisible: true,
  options: {
    middleware: path.join(__dirname, '../controllers'),
  },
});
router.mount(MiddlewarePlugin);

app.use(koaBody({// 可上传文件
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
  },
}));

app.use(async (ctx, next) => { // 这里处理错误
  try {
    await next();
  } catch (error) {
    if (config.env === 'dev' || process.env.DEBUG === 'true') {
      console.error(error); // eslint-disable-line no-console
      console.error(error.stack); // eslint-disable-line no-console
    }
    ctx.status = error.statusCode || 500;
    ctx.body = {
      statusCode: error.statusCode || 500,
      message: error.message,
    };
  }
});

app.use(bodyParser());

if (config.env === 'dev' || process.env.DEBUG === 'true') { // 这里是调试的时候打log用
  app.use(async (ctx, next) => {
    console.log('-----QUERY-----'); // eslint-disable-line no-console
    console.log(ctx.query); // eslint-disable-line no-console
    console.log('-----REQUEST-----'); // eslint-disable-line no-console
    console.log(ctx.request.body); // eslint-disable-line no-console

    await next();

    console.log('-----RAW_STATUS-----'); // eslint-disable-line no-console
    console.log(ctx.response.status); // eslint-disable-line no-console
    console.log('-----RAW_BODY-----'); // eslint-disable-line no-console
    console.log(ctx.body); // eslint-disable-line no-console
  });
}

app.use(router.routes());

const webPort = process.env.webPort ? process.env.webPort : config.webPort;
app.listen(webPort, '0.0.0.0');

console.log(`Web Server is listening port ${webPort}`);

const schedule = require('./utils/schedule');

schedule.initTimeoutJobs().then(() => { // 这里设置计划任务
  console.log('All init timeout jobs are set');
});

const socket = require('./utils/socket');

socket.init().then(() => { // 这里设置计划任务
  console.log('Socket init finished');
});
