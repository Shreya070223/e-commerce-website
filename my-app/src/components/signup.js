import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
          navigate("/");
        }
    })

  const collectData = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await res.json();
      console.log(result);

      if (result && result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate('/');
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form className='signpg' onSubmit={collectData}>
        <input
          className="inputsty"
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter Name'
        />
        <input
          className="inputsty"
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter Email'
        />
        <input
          className="inputsty"
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter Password'
        />
        <button className="butsty" type="submit">Sign up</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Signup;
