
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React,{useState,useEffect} from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



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
    console.log(post)


  return (
    <div>
        <Card className="custom-card">
             
             <Card.Body>
              
              <Card.Title key={post._id}>{post.title}
              
              </Card.Title>
              <Card.Subtitle>
                {post.date}
              </Card.Subtitle>
            
               <Card.Text>
               
               
                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                 
               </Card.Text>
               
               {/* <Button variant="danger" onClick={()=>handleDelete(post._id)}>Delete</Button>{' '} */}
               
               <Button  variant="success"> <NavLink  to={`/update/${post._id}`} className="nav-link" >Edit</NavLink> </Button>

               
               
     
             </Card.Body>
           </Card>
      
    </div>
  );
}

export default SinglePost;

