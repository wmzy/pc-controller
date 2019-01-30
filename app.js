const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const router = require('./router');
const token = require('./token');

const app = new Koa();

app
  .use(static(__dirname + '/public'))
  .use(bodyParser())
  .use((ctx, next) => {
    if (ctx.query.token !== token) return ctx.throw(403);
    return next();
  })
  .use(router.routes());

module.exports = app;
