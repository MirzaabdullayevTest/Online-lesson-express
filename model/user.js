const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    surname: {
        required: true,
        type: String
    },
    cart: {
        items: [
            {
                lessonId: {
                    type: Schema.Types.ObjectId,
                    // required: true
                },
                count: {
                    type: Number,
                    default: 1,
                    // required: true
                }
            }
        ]
    }
})

userSchema.statics.buyLesson = async function (id) {
    const items = [...userSchema.obj.cart.items] // []
    const idx = items.findIndex(lesson => lesson.lessonId.toString() === id.toString()) // 0 1 2 23 // -1

    if (idx >= 0) {
        // demak dars korzinada bor // count 1 ga oshiramiz
        items[idx].count = items[idx].count + 1
    } else {
        //demak dars korzinada yo'q // count yaratib push qilamiz
        items.push({
            lessonId: id,
            count: 1
        })
    }

    userSchema.obj.cart = {
        items
    }
    
    await userSchema.save()

    return userSchema.obj.cart.items
}

module.exports = model('user', userSchema)