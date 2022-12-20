const morgan = require('morgan')
const logger = require('./logger')

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).json({ error: 'malformated id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    morgan,
    unknownEndpoint,
    errorHandler
}