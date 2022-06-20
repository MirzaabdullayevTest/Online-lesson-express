const express = require('express')
const router = express.Router()

const lessons = [
    { name: 'Node js', id: 1 },
    { name: 'React js', id: 2 },
    { name: 'JavaScript', id: 3 },
]

// Get all lessons
router.get('/', (req, res) => {
    res.status(200).send(lessons)
})

// Get single lesson with name
router.get('/lesson', (req, res) => {
    // console.log(req.query);
    const lesson = lessons.find(les => les.name === req.query.name)
    res.status(200).send(lesson)
})

module.exports = router