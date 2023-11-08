const express = require('express')
const routes = express.Router()

//routes
const ContentRoutes = require('./content/index')
const UserRoutes = require('./users/index')

routes.get('/', function(req, res, next) { res.send('this is routes from apiRoutes') })
routes.use('/content', ContentRoutes)
routes.use('/users', UserRoutes)

module.exports = routes