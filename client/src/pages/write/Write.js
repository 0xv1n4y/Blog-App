import "./Write.css"
import React,{useState} from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import Button from 'react-bootstrap/Button';


const Write = () => {

  const location=useNavigate()

  const [blog, setBlog] = useState({
    title: '',
    content: '',
    image: null,
  });

  const [imageURL, setImageURL] = useState(null);

  const handleInputChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleImageChange = async(e) => {
    setBlog({ ...blog, image: e.target.files[0] });

    // Set the imageURL with the URL of the uploaded image
  setImageURL(URL.createObjectURL(e.target.files[0]));
 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', blog.title);
    
    formData.append('content', blog.content);
    formData.append('image', blog.image);

    try {
      await axios.post('http://localhost:5200/api/post/createpost', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((res)=>{
        location("/")
      })
      
    } catch (error) {
      alert(error.message)
    }
  };

  
  
    return (

      <div className="write">
      {imageURL && (
        <img className="writeImg" src={imageURL} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
      
          
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            name="image" 
            accept="image/*"
            onChange={handleImageChange}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            name="title"  
            value={blog.title} 
            onChange={handleInputChange}
          />
        </div>
        <div className="writeFormGroup">
          <CKEditor
            placeholder="Tell your story..."
            editor={ClassicEditor}
            data={blog.content}

            onChange={(event, editor) => {
              const data = editor.getData();
             setBlog({ ...blog, content: data });
           }}
          
            className="writeInput writeText"
          
          />
        </div>
      
        <Button   style={{position:"absolute",bottom:"-80px",right:"10px"}} variant="outline-dark" type="submit" >publish</Button>
      </form>
    </div>



   
    )
}

export default Write



