const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        required: true,
    },
    number: {
        type: String,
        minLength: 10,
        validate: {
            validator: v => /^\d{2,3}-\d+$/.test(v),
            message: props => `${props.value} is not valid phone number!`
        },
        required: true,
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)