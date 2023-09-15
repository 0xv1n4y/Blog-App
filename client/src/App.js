
import Home from './pages/Home';
import Navbars from './pages/Navbar';
import Update from './pages/Update';
import SinglePost from './pages/SinglePost';
import { Routes,Route } from "react-router-dom";
import axios from 'axios';
import React,{ useState} from 'react';
import Write from './pages/write/Write';



function App() {
  const [search,setSearch]=useState("")
  const [products,setProducts]=useState([])

// To handle delete button 
const handleDelete=async(id)=>{
  await axios.delete(`api/post/${id}`).then(()=>{
    setProducts(products.filter((product)=>product._id !== id));
  })

}


 
  return (
    <div className="App">
      <Navbars search={search} setSearch={setSearch}/>
      <Routes>
        <Route path='/' element={<Home search={search} handleDelete={handleDelete} products={products} setProducts={setProducts}  />}/>
        <Route path='/write' element={<Write/>}/>
        <Route path='/update/:id' element={<Update />}/>
        <Route path='/single/:id' element={<SinglePost handleDelete={handleDelete} />}/>
      </Routes>
     
    </div>
  );
}

export default App;
