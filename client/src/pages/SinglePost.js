
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';

import { useParams } from 'react-router-dom';




const SinglePost = () => {
    const {id}=useParams()
    const [post,setPost]=useState({})


    
    useEffect(()=>{
        axios.get(`http://localhost:5200/api/post/${id}`).then((response)=>{
            setPost(response.data)
           
        }).catch(error=>{
            console.error(error)
        })

    },[id])
    
    



  return (
    <div className='html'>
    <div className='main'>

<div class="blog_post">
  <div class="img_pod1">
    <img className='img1' src={`http://localhost:5200/${post.image}`} alt=''/>
  </div>
  <div class="container_copy1">
    <h3 className='h3' style={{color:"#999",fontSize: "1.25rem",}}>{new Date(post.createdAt).toDateString()}</h3>
    <h1  className='h1' key={post._id}>{post.title}</h1>
    <p className='p'> <div dangerouslySetInnerHTML={{ __html: post.content }}></div></p>
    <a class="btn_primary1" href={`/update/${post._id}`} ><FaEdit/> Edit</a>
  </div>
  
</div>
</div>




      
    </div>
  );
}

export default SinglePost;

