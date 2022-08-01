const { Router } = require('express')
const router = Router()
const User = require('../model/user')

function totalPrice(items) {
    const sum = 0
    return items.reduce((prev, current) => +prev + +current.lessonId.price * current.count, sum)
}

// Get home page
router.get('/', async (req, res) => {
    const userCart = await User.findById('62e7d5232e76ea6078209083')
        .populate('cart.items.lessonId')

    res.render('card', {
        title: 'Shopping card',
        isCard: true,
        total: totalPrice(userCart.cart.items),
        items: userCart.cart.items
    })
})

router.post('/add', async (req, res) => {
    const user = await User.findOne()  // [] // {John}

    try {
        await user.buyLesson(req.body.id)
    } catch (error) {
        res.status(400).send(error)
    }

    // res.send('Lesson Bought')
    res.redirect('/card')
})

router.delete('/remove/:id', async (req, res) => {
    const card = await Card.removeById(req.params.id)
    if (!card) {
        // demak qanaqadur oshibka bor
        return res.send('Error')
    }

    res.status(200).send(card)
})

module.exports = router