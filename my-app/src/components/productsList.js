import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';


function ProductsList(){

    const [products,setProducts]=useState([]);

    useEffect(()=>{
       getProducts();
    },[]);

    const  getProducts=async()=>{
      const pro=await fetch("http://localhost:8000/products",{
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      const prod=await pro.json();
      setProducts(prod);
    }

    const deleteprod=async(id)=>{
      const result=await fetch(`http://localhost:8000/products/${id}`,{
        method:"delete",
          headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }

      });
      const res=await result.json();
      if(res){
        alert("record is deleted"); 
         getProducts();
      }
    }

    const searchHandle=async(event)=>{
      const key=event.target.value;
      if(key){
        const result=await fetch(`http://localhost:8000/search/${key}`,{
          headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
      });
      const res=await result.json();
      if(res){
        setProducts(res);
      }
      }else{
        getProducts();
      }
      
    }

return(
    <div className="product-list">
      <h1>Products List</h1>
      <input type="text" placeholder="search product" className="search-box" onChange={searchHandle}/>
      <ul >
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {
        products.map((item,index)=>
          <ul key={item._id}>
        <li>{index+1}</li>
        <li>{item.name}</li>
        <li>{item.price}</li>
        <li>{item.category}</li>
        <li><button onClick={()=>deleteprod(item._id)}>Delete</button>
          <Link to={"/update/"+item._id}>Update</Link></li>

      </ul>
        )
      }
  
    </div>
)

}

export default ProductsList;