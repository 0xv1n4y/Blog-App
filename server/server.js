const express=require('express')
const app=express()
const mongoose=require('mongoose')
require('dotenv').config()
const dataRoutes=require("./routes/post")

const bodyParser = require('body-parser');
const cors = require('cors');



const PORT=process.env.PORT

app.use(bodyParser.json());
app.use(cors());

app.use(express.json())  //Middile Ware

//Database Connection

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Db is Connected"))
.catch((err)=>console.log(err.message))


app.use("/api/post",dataRoutes)  //Route End point






app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.listen(PORT,()=>console.log(`Server is Running in Port${PORT}`))

