const { Router } = require('express')
const router = Router()
const User = require('../model/user')

router.post('/add', async (req, res) => {
    const user = new User({
        name: req.body.name,
        surname: req.body.surname
    })

    await user.save()
    res.status(201).send('User created')
})

module.exports = router