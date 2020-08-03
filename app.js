import Koa from 'koa';
import axios from 'axios';
const router = require("@koa/router")();
const cors = require('@koa/cors');

const app = new Koa();

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});
  
// x-response-time
  
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

router.get('/cases', async (ctx, next) => {
  const result = await axios.get('https://www.mohfw.gov.in/data/datanew.json');
  ctx.body = result.data;
  await next()
});

app.use(router.routes());
app.use(cors());
const port = process.env.PORT || 8001
app.listen(port);

export default app;