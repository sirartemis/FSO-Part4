const Person = require('../models/person')

const initialPersons = [
    {
        name: 'Vladimir',
        number: '90-5340154684'
    },
    {
        name: 'Arto Hellas',
        number: '123-123456789'
    }
]

const nonExistnigId = async () => {
    const person = new Person({ name: 'willremovethissoon', number: '123-987654321' })
    await person.save()
    await person.remove()

    return person.__id.toString()
}

const personsInDb = async () => {
    const persons = await Person.find({})
    return persons.map(person => person.toJSON())
}

module.exports = {
    initialPersons, nonExistnigId, personsInDb
}