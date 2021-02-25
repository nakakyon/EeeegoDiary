import * as functions from 'firebase-functions'
const { Nuxt } = require('nuxt')
const express = require('express')

const app = express()
const config = {
  dev: false,
  buildDir: '.nuxt',
  build: {
    publicPath: '/assets/',
  },
}

const nuxt = new Nuxt(config)
app.use(async (req: any, res: any) => {
  await nuxt.ready()
  return await nuxt.render(req, res)
})

exports.ssrapp = functions.https.onRequest(app)
