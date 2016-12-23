import Koa from 'koa'
import koaRouter from 'koa-router'

let router = koaRouter({ prefix: `/${process.env.PREFIX}` })

let app = new Koa()

let port = process.env.PORT || 3002

let clientID = `0d2b92a89088494488cb5633a3b039f7`
let redirectUri = `http://benevolent.ninja/${process.env.PREFIX}/redirect`

let code

router
  .get(`/`, (ctx, next) => {
   ctx.body = `
    <a href="https://api.instagram.com/oauth/authorize/?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=code">Sign up</a>`
  })
  .get(`/redirect`, (ctx, next) => {
    code = ctx.query.code
    console.log(code) 
    ctx.body = `Thanks! You're signed in`
  })

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port)
console.log(`Listening on port: ${port}`)

