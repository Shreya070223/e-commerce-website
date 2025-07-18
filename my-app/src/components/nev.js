import React from 'react'
import {Link,useNavigate} from 'react-router-dom';

function Nav(){
   const auth=localStorage.getItem('user');

   const navigate = useNavigate();

   const logout=()=>{
    localStorage.clear();
    navigate("/signup");
   }

    return (
     <div className="nav">
      <img className='logo'
      src='https://img.freepik.com/premium-vector/e-commerce-logo-design-with-blue-orange-colors-business-logo-vector-template_747553-68.jpg' 
      alt='logo'></img>
      {auth?
        <ul className="nav-ul">
            <li><Link to="/">Home page</Link></li>
            <li><Link to="/pr">products</Link></li>
            <li><Link to="/add">Add products</Link></li>
            <li><Link to="/update/:id">update products</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link onClick={logout} to="/signup">logout ({JSON.parse(auth).name})</Link></li>
          </ul>
            : <ul className="nav-ul nav-right">   
               <li><Link to="/signup">Signup</Link></li>
               <li><Link to="/login">Login</Link></li>
        </ul>
      }
     </div>

    )
  }
 
export default Nav;
