const express = require('express')
const app = express()
const Joi = require('joi')
const authMiddleware = require('./middleware/auth')
const morgan = require('morgan')
const helmet = require('helmet')
const path = require('path')
const pug = require('pug')

// Require routes
const homeRouter = require('./routes/home')
const lessonRouter = require('./routes/lesson')

// Pug connection
app.set('view engine', 'pug')

// Dotenv
require('dotenv').config()

const lessons = [
    { name: 'Node js', id: 1 },
    { name: 'React js', id: 2 },
    { name: 'JavaScript', id: 3 },
]

// Middleware functions
app.use(express.json())

// Express static middleware
app.use(express.static(path.join(__dirname, 'public')))

// Urlencoded middleware
app.use(express.urlencoded({ extended: true }))

// Module middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'))
}
app.use(helmet())

// Routing
app.use('/', homeRouter)
app.use('/api/lessons/', lessonRouter)

// Get single lesson with id
app.get('/api/lessons/:id', (req, res) => {
    // console.log(req.params); // bitta object
    const lesson = lessons.find(les => les.id === +req.params.id)
    if (!lesson) {
        return res.status(404).send('404 not found')
    }
    res.status(200).send(lesson)
})

// Delete single lesson with id
app.delete('/api/lessons/delete/:id', authMiddleware, (req, res) => {
    // console.log(req.params.id);
    const idx = lessons.findIndex(les => les.id === +req.params.id)

    // Validator
    if (idx === -1) {
        return res.status(404).send('404 not found. Id is not exist')
    }

    lessons.splice(idx, 1)
    res.status(200).send('Lesson successfully deleted')
})

// Post add lesson
app.post('/api/lessons/add', authMiddleware, (req, res) => {
    const schema = Joi.object({
        name: Joi.string().
            min(3).
            required(),
    })

    const value = schema.validate(req.body)

    if (value.error) {
        res.status(404).send(value.error.message)
        return
    }

    const lesson = {
        name: req.body.name,
        id: lessons.length + 1 // 
    }

    lessons.push(lesson)
    res.status(201).send('Lesson created successfull')
})

// Put lesson with id
app.put('/api/lessons/update/:id', authMiddleware, (req, res) => {
    const idx = lessons.findIndex(les => les.id === +req.params.id)

    // Validator
    if (idx === -1) {
        return res.status(404).send('404 not found. Id is not exist')
    }

    let lesson = {
        name: req.body.name,
        id: req.params.id
    }

    lessons[idx] = lesson

    res.status(200).send('Lesson updated successfull')
})

const port = normalizePort(process.env.port || 3000) // Number

app.listen(port, () => {
    console.log('App listening on port ' + port);
})

function normalizePort(val) { // number // string // false
    const num = parseInt(val)
    if (isNaN(num)) {
        return val
    }

    if (num) {
        return num
    }

    return false
}