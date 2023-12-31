const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

//get all
router.get('/', async (req, res)=>{
    try {
        const users = await User.find()
        res.json(users)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//get one
router.get('/:id', getUser, (req, res)=>{
    res.json(res.user)
})

//create one
// router.post('/register', async (req, res)=>{
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     const user = new User({
//         username: req.body.username,
//         display_name: req.body.display_name,
//         email: req.body.email,
//         password: hashedPassword
//     })

//     try {
//         const newUser = await user.save()
//         res.status(201).json(newUser)
//         res.redirect('/login')
//     } catch (err) {
//         res.status(400).json({message: err.message})
//         res.redirect('/register')
//     }
// })

//update one
router.patch('/:id', getUser, async (req, res)=>{
    if(req.body.username != null){
        res.user.username = req.body.username
    }

    if(req.body.display_name != null){
        res.user.display_name = req.body.display_name
    }

    if(req.body.email != null){
        res.user.email = req.body.email
    }

    if(req.body.password != null){
        res.user.password = req.body.password
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//delete one
router.delete('/:id', async (req, res)=>{
    try {
        await res.user.remove()
        res.json({message: 'deleted user'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getUser(req, res, next){
    let user
    try {
        user = await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json({message: 'cannot find user'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.user = user
    next()
}

module.exports = router