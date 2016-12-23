import Koa from 'koa'
import koaRouter from 'koa-router'

let router = koaRouter()
let app = new Koa()

router
  .get(`/`, (ctx, next) => {
    ctx.body = `Hello World!`
  })
  .get(`/test`, (ctx, next) => {
    ctx.body = `Hello World! TEST`
  })

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
console.log(`Listening on 3000`)
