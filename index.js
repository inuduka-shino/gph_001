/* static-page index.js */
/*eslint-env node */
/*eslint no-console: off */

const path = require('path'),
      Koa = require('koa'),
      serv = require('koa-static');

const app = new Koa();

app.use(async (ctx, next) => {
  const path = ctx.request.path;

  if (path === '') {
    ctx.request.path += '/';
  }

  await next();
});

// static resource
app.use(serv(path.join(__dirname, 'docs/'), {
  index: 'index.html',
  extensions: ['html']
}));

module.exports = app;
