import Koa from 'koa'
import koaRouter from 'koa-router'
import fetch from 'isomorphic-fetch'
import FormData from 'form-data'
import { instaBase, photonUrl, clientID, clientSecret, redirectUri } from './config'
import Home from './Home'
import Success from './Success'

/*----------------------------------------------------------------------------*/

let port = process.env.PORT || 3002
let router = koaRouter({ prefix: `/${process.env.PREFIX}` })
let app = new Koa()

let tokenResponse
let media = []

/*----------------------------------------------------------------------------*/

let fireTorpedos = () => fetch(photonUrl, { method: `POST` })

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

    tokenResponse = await r.json()

    if (tokenResponse.access_token) getLatestMedia()
  } catch(e) {
    throw e
  }
}

let getLatestMedia = async () => {
  let r = await fetch(`
    ${instaBase}/v1/users/self/media/recent/?access_token=${tokenResponse.access_token}
  `)

  let { data } = await r.json()
  media = [...media, ...data.map(x => ({ id: x.id, likes: x.likes.count }))]
}

setInterval(() => {
  if (media.length) {
    media.forEach(async x => {
      let r = await fetch(`
        ${instaBase}/v1/media/${x.id}?access_token=${tokenResponse.access_token}
      `)

      let j = await r.json()

      if (j.data.likes.count > x.count) {
        // fire the torpedoes!
        console.log(`!!! FIRE THE TORPEDOS !!!`)
      }

      x.count = j.data.likes.count
    })
  }
}, 5000)


/*----------------------------------------------------------------------------*/

router
  .get(`/`, ctx => {
    ctx.body = Home
  })
  .get(`/redirect`, ctx => {
    getAccessToken(ctx.query.code)
    ctx.body = Success
  })

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port)
console.log(`Listening on port: ${port}`)
