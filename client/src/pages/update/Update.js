import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useParams ,useNavigate} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"


const Update = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const [editedData,setEditedData]=useState("")
    const [title,setTitle]=useState("")
    const [image, setImage] = useState(null); // New state for the updated image file
    const [imageURL, setImageURL] = useState(null);

    useEffect(()=>{
        axios.get(`http://localhost:5200/api/post/${id}`).then((response)=>{
            setEditedData(response.data.content);
            setTitle(response.data.title);
        }).catch((error)=>console.log(error))
    },[id])

    const handleEditPost = () => {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', editedData);
      formData.append('image', image); // Add the updated image file to the form data
  
      axios.patch(`/api/post/${id}`, formData)
        .then((response) => {
          console.log('Post Updated Successfully');
          navigate('/');
        })
        .catch((error) => console.error(error));
    };

    const handleImageChange = (e) => {
      // Handle the file selection for the updated image
      const file = e.target.files[0];
      setImage(file);
      setImageURL(URL.createObjectURL(e.target.files[0]));
    };




  return (

    <div className="write">
       <h1 style={{fontSize:30,fontWeight:900,paddingTop:10}}>Edit BlogPost</h1>
    {imageURL && (
      <img className="writeImg" src={imageURL} alt="" />
    )}
    
      <div className="writeFormGroup">
        <label htmlFor="fileInput">
          <i className="writeIcon fas fa-plus"></i>
        </label>

    <input type="file" id="fileInput"  style={{ display: "none" }} name="image" onChange={handleImageChange} accept="image/*" />
    
        
   

 <input type="text" className="writeInput" autoFocus={true} name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
      </div>
      <div className="writeFormGroup">
         <CKEditor 
                  
                                 editor={ClassicEditor}
                                 data={editedData}
                                 onChange={(e,editor)=>{
                                   const data=editor.getData();
                                   setEditedData(data)
              
                                }}
                                />
  
      </div>
   
      <Button onClick={handleEditPost} type="submit"   style={{position:"absolute",bottom:"-80px",right:"10px"}} variant="outline-dark"> ADD</Button>
   
  </div>



  );
}

export default Update;
