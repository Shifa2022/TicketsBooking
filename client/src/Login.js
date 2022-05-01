
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import {Link,Navigate} from "react-router-dom"
import {useNavigate} from "react-router-dom";


function Login() {
    const [email, setEmaillog] = useState(" ");
    const [password, setPasswordlog] = useState(" ");
    // const [name, setName] = useState("");
    const [flag, setFlag] = useState(false);
    // const [user, setUser] = useState();
    const [home, setHome] = useState(true);
    const navigate=useNavigate();
  
    
  
    async function handleLogin(e) {
      e.preventDefault();
      
      
  
      if ( !email || !password) {
        setFlag(true);
        localStorage.setItem("Email", JSON.stringify(email));
       
        console.log("login Successful Saved in Local Storage");
      } else {
        setFlag(false);
        setHome(!home);
    }
  
  
      let data={email,password}
      try{
        let result=await fetch('http://127.0.0.1:5000/login/',{
          method:'POST',
          // mode:"no-cors",
          headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
          },
          body:JSON.stringify(data)  
          // body: await result.JSON.stringify(data),
        });
        // // set the state of the user
        // setUser(result.data)
        // // store the user in localStorage
        // localStorage.setItem('user', result.data)
        // console.log(result.data)
       result =await result.json();
        // localStorage.setItem("user",JSON.stringify(result.user))
        console.log(result)
        if(result.flag2==="true")
        {
          navigate("/Main")
          localStorage.setItem("user",JSON.stringify(result.user))  
          window.location.reload(true);
          // changes
          setHome(home);
        }
        else{
          alert(result.message)
         
          setHome(!home);
        }
        
      }
    //    <div><Navigate to="/main"/></div>
        
      catch(e){
        console.log(e)
      }
    // setHome(!home);
   
  }
  
  // if (user) {
  //   return <div>{user.email} is loggged in</div>;
  // }

 

  return (
   
    <div className="login-page">
      {home ? (
        <form className="form" onSubmit={handleLogin}>

        <div className="login">
          <div className="login-header">
            <h3>LOGIN</h3>
          </div>
        </div>
          <div className="login-form">
            <input
              type="email"
              placeholder="Enter email"
              onChange={(event) => setEmaillog(event.target.value)}
            />
          </div>

          <div className="login-form">
            <input
              type="password"
              placeholder="Enter password"
              onChange={(event) => setPasswordlog(event.target.value)}
            />
          </div>

          <button>
            Login
          </button>
          <Link to="/register">Don't Have an account?</Link>
          {flag && (
            <Alert color="primary" variant="warning">
              Fill correct Info else keep trying.
            </Alert>
          )}
        </form>
       ) : (
        <Navigate to="/main"/>
        
      )} 
      
    </div>
  );
}


export default Login;