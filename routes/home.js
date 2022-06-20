const { Router } = require('express')
const router = Router()

// Get home page
router.get('/', (req, res) => {
    res.send('<h1> Here is home page </h1>')
})

module.exports = router