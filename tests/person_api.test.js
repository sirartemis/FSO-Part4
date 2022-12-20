const mongoose = require('mongoose')
const supertest = require('supertest')
const Person = require('../models/person')
const app = require('../app')
const helper = require('./test_api_helper')

const api = supertest(app)

jest.setTimeout(100000)

beforeEach(async () => {
    await Person.deleteMany({})
    console.log('cleared')

    const personObjects = helper.initialPersons
        .map(person => new Person(person))
    const promiseArray = personObjects.map(person => person.save())
    await Promise.all(promiseArray)
    console.log('updated testing database')
})

test('persons are returned as json', async () => {
    await api
        .get('/api/persons')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
test('there are two persons', async () => {
    const response = await api.get('/api/persons')

    expect(response.body).toHaveLength(helper.initialPersons.length)
})

test('the first person is Vladimir', async () => {
    const response = await api.get('/api/persons')

    const names = response.body.map(p => p.name)
    expect(names).toContain('Vladimir')
})

test('a valid person can be added', async () => {
    const newPerson = {
        name: 'Wolfgang',
        number: '123-123456789'
    }

    await api
        .post('/api/persons')
        .send(newPerson)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const personsAtEnd = await helper.personsInDb()
    expect(personsAtEnd).toHaveLength(helper.initialPersons.length + 1)

    const names = personsAtEnd.map(p => p.name)

    expect(names).toContain(
        'Wolfgang'
    )
})

test('person without name is not added', async () => {
    const newPerson = {
        number: '123-123455677'
    }

    await api
        .post('/api/persons')
        .send(newPerson)
        .expect(400)

    const personsAtEnd = await helper.personsInDb()

    expect(personsAtEnd).toHaveLength(helper.initialPersons.length)
})

test('a specific person can be viewed', async () => {
    const personsAtStart = await helper.personsInDb()

    const personToView = personsAtStart[0]

    const resultPerson = await api
        .get(`/api/persons/${personToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const processedPersonToView = JSON.parse(JSON.stringify(personToView))

    expect(resultPerson.body).toEqual(processedPersonToView)
})

test('a person can be deleted', async () => {
    const personsAtStart = await helper.personsInDb()
    const personToDelete = personsAtStart[0]

    await api
        .delete(`/api/persons/${personToDelete.id}`)
        .expect(204)

    const personsAtEnd = await helper.personsInDb()

    expect(personsAtEnd).toHaveLength(
        helper.initialPersons.length - 1
    )

    const names = personsAtEnd.map(p => p.name)

    expect(names).not.toContain(personToDelete.name)
})

afterAll(() => {
    mongoose.connection.close()
})