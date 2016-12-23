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

let instaBase = `https://api.instagram.com`
let authUrl = `${instaBase}/oauth/authorize/?`
+ `client_id=${clientID}&redirect_uri=${redirectUri}&response_type=code`

let tokenResponse

let user
let media = []

let getAccessToken = async code => {
  let form = new FormData()

  form.append(`client_id`, clientID)
  form.append(`client_secret`, clientSecret)
  form.append(`grant_type`, `authorization_code`)
  form.append(`redirect_uri`, redirectUri)
  form.append(`code`, code)

  try {
    let r = await fetch(`${instaBase}/oauth/access_token`, {
      method: `POST`,
      body: form,
    })

    let j = await r.json()

    tokenResponse = j
    console.log(`token response: `, tokenResponse)

    if (tokenResponse.access_token) {
      let r = await fetch(`
        ${instaBase}/v1/users/search?q=lauradittmann&access_token=${tokenResponse.access_token}`
      )

      let j = await r.json()

      console.log(`j?: `, j)

      // user = j.data.find(x => x.username === `lauradittmann`)

      // console.log(`user is: `, user)
    }

  } catch(e) {
    throw e
  }
}

let getLatestMedia

// setInterval(() => {
//   if (tokenResponse && tokenResponse.access_token) {
//     try {
//       let r = await fetch(`https://api.instagram.com/v1/users/{user-id}/media/recent/?access_token=ACCESS-TOKEN`, {
//         method: `POST`,
//         body: form,
//       })
//
//       let j = await r.json()
//
// }, 1000)

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
