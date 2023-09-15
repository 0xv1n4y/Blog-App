import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useParams ,useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"


const Update = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const [editedData,setEditedData]=useState("")

    useEffect(()=>{
        axios.get(`http://localhost:5200/api/post/${id}`).then((response)=>{
            setEditedData(response.data.content)
        }).catch((error)=>console.log(error))
    },[id])

    const handleEditPost=()=>{
        axios.patch(`/api/post/${id}`,{ content: editedData }).then((response)=>{
            console.log("PostUpdatedSuccesfully")
            navigate('/')
        }).catch(error=>console.error(error))

    }


  return (
    <div>
        <h1 style={{fontSize:30,fontWeight:900,paddingTop:10}}>Edit BlogPost</h1>
       
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      </Form.Group>
      <Form.Group className="mb-3"  controlId="exampleForm.ControlTextarea1">
       
        {/* <Form.Control type="textarea" rows={3} name='content' value={(editedData)} onChange={handleContentChange}/> */}

        <CKEditor 
                  
                   editor={ClassicEditor}
                   data={editedData}
                   onChange={(e,editor)=>{
                     const data=editor.getData();
                     setEditedData(data)

                  }}
                  />
        
      </Form.Group>
      <div>
      <Button onClick={handleEditPost} type="submit"variant="primary">Submit</Button>{' '}
      </div>
     
    </div>
  );
}

export default Update;
