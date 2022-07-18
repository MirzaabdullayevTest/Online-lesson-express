const { Schema, model } = require('mongoose')

const lessonSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    author: {
        required: true,
        type: String
    },
    year: Number,
    img: String
})

module.exports = model('lesson', lessonSchema)