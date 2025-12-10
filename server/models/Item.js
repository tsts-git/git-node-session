const { interval } = require('date-fns')
const mongoose = require('mongoose')

const Item = new mongoose.Schema({

    name:{
        type : String,
        required:true,
        unique: true
    },

    img:{
        type:String
    },

    price: {
        type: Number,
        required:true
    },

    avalible: {
        type: Boolean,
        required:true,
        default: true
    },

    free_delivery:{
        type: Boolean,
        required:true,
    }
    },{
        timestamps: true
    
})

module.exports = mongoose.model('Item', Item, 'Item')
