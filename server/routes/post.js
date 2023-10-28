const express=require('express')
const router=express.Router()
const Data=require("../models/data")
const mongoose = require('mongoose')


const multer = require('multer');

// Define the storage and upload using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Define the destination 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Define the filename
  },
});

const upload = multer({ storage: storage }); 

// Route to create a new blog post with an image



router.post('/createpost', upload.single('image'), async (req, res) => {
  const { title, content} = req.body;
  const image = req.file.path;

  try {
    const newBlog = new Data({ title, content, image });
    const savedBlog = await newBlog.save();
    res.json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Error saving blog post.' });
  }
});




// To get single post

router.get('/:id',async(req,res)=>{
    const {id}=req.params
    try{
        const singleData=await Data.findById(id)
        res.status(200).json(singleData)

    }catch(err){
        console.log(err.message)
    }
})

// To get All posts

router.get('/',async(req,res)=>{
    try{
        const allData=await Data.find()
        res.status(200).json(allData)

    }catch(err){
        console.log(err.message)
    }
})

// For delete the post

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

 
// To update the post


router.patch('/:id', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.path : null; // Check if a new image was uploaded

  try {
    const updatedPost = await Data.findByIdAndUpdate(
      req.params.id,
      { title, content, image },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the blog post' });
  }
});



module.exports=router



