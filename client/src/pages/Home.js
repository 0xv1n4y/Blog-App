import React,{useEffect} from 'react';
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';

const Home = ({search,handleDelete,products,setProducts}) => {

 

 

  // To fetch the Total posts from server 
useEffect(()=>{
    axios.get("http://localhost:5200/api/post/").then((res)=>setProducts(res.data))
    .catch((err)=>console.log(err.message))
})

  return (
  
      <div>
        {products
        .filter((product)=>{
        const query=search.toLowerCase();
        return product.title.toLowerCase().includes(query) || product.content.toLowerCase().includes(query)})
        .map((product)=>(
              <Card >
              
                <Card.Body >
                  
                  <Card.Title key={product._id}>
                  <NavLink to={`/single/${product._id}`} className="nav-link">{product.title}</NavLink>
                  </Card.Title>

                  {/* <Card.Text >{stripHtmlTags(product.content) < 25 ? product.content: `${stripHtmlTags(product.content).slice(0,25)}...`}  </Card.Text> */}
                  <Card.Text>
                  <div dangerouslySetInnerHTML={{ __html: product.content.slice(0, 50) }} ></div>

                  </Card.Text>
                  
                 
              
                  <Button variant="danger" onClick={()=>handleDelete(product._id)}>Delete</Button>{' '}
                  
                </Card.Body>
            </Card>
              
          ))}
    </div>
    
    
  );
}

export default Home;
