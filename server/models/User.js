const { interval } = require('date-fns')
const mongoose = require('mongoose')

const User = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        uniqu: true,
        lowercase: true,
        trim: true
    },

    password:{
        type: String,
        require: true
    },

    name:{
        type: String,
        required: true
    },

    email: {
        type: String,
        lowercase: true,
        require: true,
        trim: true
    },

    phone :{
        type: String
    },

    roles: {
        type: String,
        enume: ["User", "Admin"],
        default: 'User'
    },

    active: {
        type: Boolean,
        default: true
    },

    },{
        timestamps: true
})

    module.exports = mongoose.model('User', User)