import React, { useEffect } from "react";
import {useParams,useNavigate} from "react-router-dom";

function UpdateProduct(){

    const [name,setName]=React.useState("");
    const [price,setPrice]=React.useState("");
    const [category,setCategory]=React.useState("");
    const [company,setCompany]=React.useState("");
    const param=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
       getProductDetails();
    },[]);

    const getProductDetails=async()=>{
      const request=await fetch(`http://localhost:8000/products/${param.id}`,{
          headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
      });
      const res=await request.json();
      setName(res.name);
      setPrice(res.price);
      setCategory(res.category);
      setCompany(res.company);
    }

    const updateProduct=async()=>{
       const userId=JSON.parse(localStorage.getItem("user"))._id;
      const result=await fetch(`http://localhost:8000/products/${param.id}`,
       {
         method:"Put",
         body:JSON.stringify({name,price,category,userId,company}),
         headers:{
         'Content-Type':"application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
         }
       }
      );
       const res=await result.json();
         navigate("/pr");
        
    }

    return(
        <div>
          <h1>Update product</h1>
          <form className='login1' onSubmit={updateProduct} >
        <input
          className="inputsty"
          type='text'
          placeholder='Enter product name'
          onChange={(e)=>setName(e.target.value)}
          value={name}
        />
        <input
          className="inputsty"
          type='text'
          placeholder='Enter product price'
          onChange={(e)=>setPrice(e.target.value)}
          value={price}
        />
        <input
          className="inputsty"
          type='text'
          placeholder='Enter product category'
          onChange={(e)=>setCategory(e.target.value)}
          value={category}
        />
        <input
          className="inputsty"
          type='text'
          placeholder='Enter product company'
          onChange={(e)=>setCompany(e.target.value)}
          value={company}
        />
        <button className="butsty" type="submit">Update Product</button>
        
      </form>
        </div>
    )
}

export default UpdateProduct;