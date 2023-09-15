import "./Write.css"
import React,{useState} from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"


const Write = () => {
    const navigate=useNavigate();
    
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
  

    
// The function will submit the post to the server
      const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
          const response=await axios.post('api/post/createpost',{title,content});
          console.log(response.data)
          navigate('/')
  
  
        }catch(err){
          console.log(err)
        }
        window.location.reload();
      
  
      }
    
    return (
        <div className="write">
            <img src="https://wallpapercave.com/uwp/uwp3417410.jpeg" alt="" className="writeImg" />
            <form onSubmit={handleSubmit} className="writeForm">
                <div className="writeformGroup">
                   
                    <input type="text" placeholder="Title" className="writeInput" autoFocus={true} name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className="writeformGroup" >
        
                   <CKEditor 
                   
                    dangerouslySetInnerHTML={{ __html: content }}
                    editor={ClassicEditor}
                    data={content}
                    onChange={(e,editor)=>{
                      const data=editor.getData();
                      setContent(data)

                   }}
                   />
                
                </div>
                <button className="writeSubmit">Publish</button>
            </form>
           
        </div>
    )
}

export default Write
