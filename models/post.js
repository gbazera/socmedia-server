const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    liked_by:{
        type: Array,
        required: true,
        default: []
    },
    date_added:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema)