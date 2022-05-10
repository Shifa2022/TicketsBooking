import React from 'react'

import './App.css';
import Confirmation from './confirmation';
import Main from './main';
import Seats from './seats';
import Registration from './Registration';
import Login from './Login';
import Ticket from './Ticket';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import ProtectedRoutes from './components/ProtectedRoutes';

// import Navbar from './components/Navbar';
// import Registration from './register';
// import Login from './login';
// import ProtectedRoutes from './ProtectedRoutes';


function App() {
 
 
  return (
    
   
   <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Registration/>}/>
      <Route path="/login" element={<Login/>}/>
        
        <Route element={<ProtectedRoutes/>}>
        <Route path="/main" element={<Main/>}/>
        <Route path="/seats" element={<Seats/>}/>
        <Route path="/confirmation" element={<Confirmation/>}/>
        <Route path='/ticket' element={<Ticket/>}/>
        </Route>
       
      </Routes>
    </Router> 


  );
}
export default App;