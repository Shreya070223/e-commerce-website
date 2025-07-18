import React,{useEffect } from "react";
import { useNavigate} from 'react-router-dom';

const Login=()=>{
    const [email,setEmail]=React.useState("");
    const [password,setPassword]=React.useState("");

    const navigate = useNavigate();

    useEffect(()=>{
            const auth=localStorage.getItem('user');
            if(auth){
              navigate("/");
            }
        })

    const handleLogin=async()=>{
        console.log(email,password);
        const res=await fetch("http://localhost:8000/login",{
          method:'Post',
          body:JSON.stringify({email,password}),
          headers: { 'Content-Type': 'application/json' }
        })
        const result=await res.json();
        console.log(result);
        if(result.auth){
          localStorage.setItem("user",JSON.stringify(result.user));
          localStorage.setItem("token",JSON.stringify(result.auth));
          navigate('/');
        }else{
          alert("please enter correct detail");
        }
    }
    return(
   <div className="login">
    <h1>Login</h1>
      <form className='login1' onSubmit={handleLogin} >
        <input
          className="inputsty"
          type='text'
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          placeholder='Enter Email'
        />
        <input
          className="inputsty"
          type='text'
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          placeholder='Enter Password'
        />
        <button className="butsty" type="submit">Login</button>
        
      </form>
      
   </div>
    )
}

export default Login;