import React,{useState} from 'react'
import {  Alert } from "react-bootstrap";
import { Link,useNavigate } from 'react-router-dom';

function Registration() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setusername] = useState();
  

  const navigate=useNavigate();
  const [flag, setFlag] = useState(false);
  const [login, setLogin] = useState(true);

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!name || !email || !password || !username ) {
      setFlag(true);
    
    } else {
      setFlag(false);
      setLogin(!login);   
  }

     let data={name,username,email,password}
     try{
       let result=await fetch('http://127.0.0.1:5000/register/',{
         method:'POST',
         headers:{
           'Accept':'application/json',
           'Content-type':'application/json',
         },
         body:JSON.stringify(data)  
       });

      result =await result.json();
      localStorage.setItem("user",JSON.stringify(result.user))  
       console.log(result)
     } catch(e){
       console.log(e)
     }

     navigate("/main");  
      window.location.reload(true);
     
  }

  return (
    <>
        <div className='login-page'>
        
          {
          
            <form className='form' onSubmit={handleFormSubmit}>
              
        <div className="login">
          <div className="login-header">
            <h3>REGISTER</h3>
          </div>
        </div>

              <div className="login-form">
                
                <input
                  type="text"
                  value={name}
                  
                  placeholder="Enter Full Name"
                  name="name"
                  
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="login-form">
                
                <input
                  type="text"
                  
                  placeholder="Enter username"
                  onChange={(event) => setusername(event.target.value)}
                />
              </div>

              <div className="login-form">
                
                <input
                  type="email"
                  value={email}
                
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="login-form">
                
                <input
                  type="password"
                  value={password}
                  
                  // value={password}
                  placeholder="Enter password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button>
                Register
              </button>
             <Link to="/login">Already Have an account?</Link>
                
              
              {flag && (
                <Alert color="primary" variant="danger">
                  I got it you are in hurry! But every Field is important!
                </Alert>
              )}
            </form>

          
        }
        </div>
    
    </>
  );
}

export default Registration;