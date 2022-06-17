const express = require('express')
const app = express()
const Joi = require('joi')

const lessons = [
    { name: 'Node js', id: 1 },
    { name: 'React js', id: 2 },
    { name: 'JavaScript', id: 3 },
]

// Middleware functions
app.use(express.json())

// Get home page
app.get('/', (req, res) => {
    res.send('<h1> Here is home page </h1>')
})

// Get all lessons
app.get('/api/lessons', (req, res) => {
    res.status(200).send(lessons)
})

// Get single lesson with name
app.get('/api/lessons/lesson', (req, res) => {
    // console.log(req.query);
    const lesson = lessons.find(les => les.name === req.query.name)
    res.status(200).send(lesson)
})

// process // 

// Get single lesson with id
app.get('/api/lessons/:id', (req, res) => {
    // console.log(req.params); // bitta object
    const lesson = lessons.find(les => les.id === +req.params.id)
    if (!lesson) {
        return res.status(404).send('404 not found')
    }
    res.status(200).send(lesson)
})

// // Delete single lesson with id
app.delete('/api/lessons/delete/:id', (req, res) => {
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
app.post('/api/lessons/add', (req, res) => {
    // console.log(req.body); // object
    // if (!req.body.name) {
    //     res.send('Ism kiritilishi kerak')
    //     return
    // }

    // if (req.body.year <= 1980 || req.body.year >= 2022) {
    //     res.status(404).send('Yil xato kiritildi')
    //     return
    // }

    // if (req.body.name.length < 3) {
    //     res.status(404).send('Ism kamida uzunligi 3 bo`lishi kerak')
    //     return
    // }

    const schema = Joi.object({
        name: Joi.string().
            min(3).
            required()
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
app.put('/api/lessons/update/:id', (req, res) => {
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

const port = normalizePort(process.env.port || 3000) // Number \\

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