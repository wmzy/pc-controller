const Router = require('koa-router');
const {lock, unlock, isLocked} = require('./locker');

module.exports = new Router({prefix: '/api/v1'})
  .get('/status', async ctx => ctx.body = await isLocked())
  .put('/lock', async ctx => ctx.body = await lock())
  .put('/unlock', async ctx => ctx.body = await unlock())
;
