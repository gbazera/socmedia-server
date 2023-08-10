const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    display_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    reg_date:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)