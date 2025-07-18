import React from "react";

function AddProduct(){

    const [name,setName]=React.useState("");
    const [price,setPrice]=React.useState("");
    const [category,setCategory]=React.useState("");
    const [company,setCompany]=React.useState("");
    const [error,setError]=React.useState(false);


    const addProduct=async()=>{

         if(!name || !price || !category || !company){
          setError(true);
          return false;
         }

         const userId=JSON.parse(localStorage.getItem("user"))._id;
         const res=await fetch("http://localhost:8000/add-product",{
          method:'Post',
          body:JSON.stringify({name,price,category,userId,company}),
          headers: { 'Content-Type': 'application/json' ,
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })

        const result=await res.json();
        console.log(result);
        
    }

    return(
        <div>
          <h1>Add product</h1>
          <form className='login1' onSubmit={addProduct} >
        <input
          className="inputsty"
          type='text'
          placeholder='Enter product name'
          onChange={(e)=>setName(e.target.value)}
          value={name}
        />
        {error && !name && <span className='error'>Enter valid name</span>}
        <input
          className="inputsty"
          type='text'
          placeholder='Enter product price'
          onChange={(e)=>setPrice(e.target.value)}
          value={price}
        />
        {error && !price && <span className='error'>Enter valid price</span>}
        <input
          className="inputsty"
          type='text'
          placeholder='Enter product category'
          onChange={(e)=>setCategory(e.target.value)}
          value={category}
        />
        {error && !category && <span className='error'>Enter valid category</span>}
        <input
          className="inputsty"
          type='text'
          placeholder='Enter product company'
          onChange={(e)=>setCompany(e.target.value)}
          value={company}
        />
        {error && !company && <span className='error'>Enter valid company</span>}
        <button className="butsty" type="submit">Add Product</button>
        
      </form>
        </div>
    )
}

export default AddProduct;