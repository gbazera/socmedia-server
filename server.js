require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./models/user')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error)=> console.log(error))
db.once('open', ()=> console.log('connected to database'))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const postsRouter = require('./routes/posts')
app.use('/posts', postsRouter)

app.post('/register', async (req, res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            username: req.body.username,
            display_name: req.body.display_name,
            email: req.body.email,
            password: hashedPassword
        })

        const newUser = await user.save()
        res.json(newUser)
        res.redirect('/login')
    } catch (err) {
        
    }
})

app.listen(5000, ()=> console.log('server started'))