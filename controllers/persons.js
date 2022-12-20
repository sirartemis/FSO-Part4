const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', async (request, response) => {
    const persons = await Person.find({})
    response.json(persons)
})

personsRouter.get('/info', async (request, response) => {
    const persons = await Person.find({})
    response.send(`Phonebook has info for ${persons.length} people<br>${new Date()}`)
})

personsRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ error: 'Name is missing' })
    }

    if (body.number === undefined) {
        return response.status(400).json({ error: 'Number is missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    const savedPerson = await person.save()
    response.status(201).json(savedPerson)
})

personsRouter.get('/:id', async (request, response) => {
    const person = await Person.findById(request.params.id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

personsRouter.delete('/:id', async (request, response) => {
    await Person.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

personsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    const updatedPerson = await Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    response.json(updatedPerson)
})

module.exports = personsRouter