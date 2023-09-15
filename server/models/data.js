const mongoose=require('mongoose')

const dataSchema=new mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
    title:{
        type:String,
        required:true

    },
    content:{
        type:String,
        required:true
    }

},{
    collection:"data",
    timestamps:true

})

module.exports=mongoose.model('Data',dataSchema)

