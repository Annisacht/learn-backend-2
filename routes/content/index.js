const express = require ('express')
const routes = express.Router()

// Controllers
const ContentController = require('../../controllers/content/content')

// Middleware


routes.get('/', 
    ContentController.Index
)

routes.post('/',
    ContentController.Create
)

routes.post('/:id',
    ContentController.Show
)

routes.put('/:id', 
    ContentController.Edit
)

routes.delete('/:id',
    ContentController.Delete
)
module.exports = routes