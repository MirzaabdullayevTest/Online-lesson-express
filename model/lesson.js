const fs = require('fs')
const path = require('path')

class Lesson {
    static async getAll() {
        return new Promise((res, rej) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'db.json'),
                (err, data) => {
                    if (err) rej(err);
                    res(JSON.parse(data))
                })
        })
    }
    static async save(lesson) {
        const lessons = await Lesson.getAll() // [1,2]

        lessons.push(lesson)

        return new Promise((res, rej) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'db.json'),
                JSON.stringify(lessons), 
                (err) => {
                    if (err) rej(err)
                    res()
                })
        })
    }
}

module.exports = Lesson