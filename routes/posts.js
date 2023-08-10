const express = require('express')
const router = express.Router()
const Post = require('../models/post')

//get all
router.get('/', async (req, res)=>{
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//get one
router.get('/:id', getPost, (req, res)=>{
    res.json(res.post)
})

//create one
router.post('/', async (req, res)=>{
    const post = new Post({
        content: req.body.content,
        author: req.body.author
    })

    try {
        const newPost = await post.save()
        res.status(201).json(newPost)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//update one
router.patch('/:id', getPost, async (req, res)=>{
    if(req.body.content != null){
        res.post.content = req.body.content
    }

    if(req.body.author != null){
        res.post.author = req.body.author
    }

    if(req.body.liked_by != null){
        res.post.liked_by = req.body.liked_by
    }

    try {
        const updatedPost = await res.post.save()
        res.json(updatedPost)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//delete one
router.delete('/:id', async (req, res)=>{
    try {
        await res.post.remove()
        res.json({message: 'deleted post'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getPost(req, res, next){
    let post
    try {
        post = await Post.findById(req.params.id)
        if(post == null){
            return res.status(404).json({message: 'cannot find post'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.post = post
    next()
}

module.exports = router