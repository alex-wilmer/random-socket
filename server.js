import Koa from 'koa'
import koaRouter from 'koa-router'
import fetch from 'isomorphic-fetch'
import FormData from 'form-data'

let router = koaRouter({ prefix: `/${process.env.PREFIX}` })

let app = new Koa()

let port = process.env.PORT || 3002

let clientID = `0d2b92a89088494488cb5633a3b039f7`
let clientSecret = `e4b8ef6399a84517a85255925f7b4d6f`
let redirectUri = `http://benevolent.ninja/${process.env.PREFIX}/redirect`

let authUrl = `https://api.instagram.com/oauth/authorize/?`
+ `client_id=${clientID}&redirect_uri=${redirectUri}&response_type=code`

let tokenResponse

let getAccessToken = async code => {
  let form = new FormData()

  form.append(`client_id`, clientID)
  form.append(`client_secret`, clientSecret)
  form.append(`grant_type`, `authorization_code`)
  form.append(`redirect_uri`, redirectUri)
  form.append(`code`, code)

  try {
    let r = await fetch(`https://api.instagram.com/oauth/access_token`, {
      method: `POST`,
      body: form,
    })

    let j = await r.json()

    tokenResponse = j

    console.log(tokenResponse)
  } catch(e) {
    throw e
  }
}

router
  .get(`/`, (ctx, next) => {
    ctx.body = `
      <a href="${authUrl}">
        Sign up
      </a>`
  })
  .get(`/redirect`, (ctx, next) => {
    getAccessToken(ctx.query.code)
    ctx.body = `Thanks! You're signed in`
  })

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port)
console.log(`Listening on port: ${port}`)
