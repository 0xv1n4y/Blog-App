const express=require('express')
const router=express.Router()
const Data=require("../models/data")
const mongoose = require('mongoose')



router.post('/createpost',async(req,res)=>{
    const {date,title,content}=req.body
    try{
        const newPost=await Data.create({date,title,content})
        res.status(200).json(newPost)

    }catch(err){
        console.log(err.message)
    }
})


router.get('/:id',async(req,res)=>{
    const {id}=req.params
    try{
        const singleData=await Data.findById(id)
        res.status(200).json(singleData)

    }catch(err){
        console.log(err.message)
    }
})

router.get('/',async(req,res)=>{
    try{
        const allData=await Data.find()
        res.status(200).json(allData)

    }catch(err){
        console.log(err.message)
    }
})

router.delete('/:id',async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return  res.status(404).json({error:'post does not exist'})
    try{
        const deleteSingleData=await Data.findByIdAndDelete(id);
        res.status(200).json(deleteSingleData)

    }catch(err){
        console.log(err.message)
    }
})

router.patch('/:id',async(req,res)=>{

    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return  res.status(404).json({error:'post does not exist'})
    try{
        const post=await Data.findById(id);
        if(!post) return res.status(404).json({error:'post does not exist'})
        const updatedPost=await Data.findOneAndUpdate({_id: id},{...req.body});
        res.status(200).json(updatedPost)

    }catch(err){
        res.status(400).json({error:err.message})
    }
    
})

module.exports=router



