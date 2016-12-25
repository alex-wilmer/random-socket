export let clientID = `0d2b92a89088494488cb5633a3b039f7`
export let clientSecret = `e4b8ef6399a84517a85255925f7b4d6f`

export let redirectUri = `http://benevolent.ninja/${process.env.PREFIX}/redirect`
export let instaBase = `https://api.instagram.com`

export let authUrl = `${instaBase}/oauth/authorize/?`
+ `client_id=${clientID}&redirect_uri=${redirectUri}&response_type=code`

export let photonUrl =
  `https://api.particle.io/v1/devices/35001a001447343432313031/led?access_token=`
+ `fa44d94676594e92a63f3b0d71a1c87c94cce248`
