const { Router } = require('express')
const router = Router()

// Get home page
router.get('/', (req, res) => {
    // res.send('<h1> Here is home page </h1>')
    res.render('index', {
        title: 'Home page'
    })
})

module.exports = router