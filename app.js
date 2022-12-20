const express = require('express')
const logger = require('./utils/logger')
const cors = require('cors')
const app = express()
require('express-async-errors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const personsRouter = require('./controllers/persons')
const blogsRouter = require('./controllers/blogs')
const {
    morgan,
    unknownEndpoint,
    errorHandler
} = require('./utils/middleware')

logger.info(`connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI)
    .then(result => {
        logger.info('connected to MongoDB')
        return result
    })
    .catch(error => {
        logger.error(`error connecting to MongoDB: ${error.message}`)
    })


app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use('/api/persons', personsRouter)
app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
