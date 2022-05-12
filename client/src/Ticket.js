import React from 'react'
import './ticket.css'
 function Ticket() {

 let seats=localStorage.getItem("seats_wanted")
 let movie=localStorage.getItem("movie_name")
 let user=localStorage.getItem("user")
 var users=JSON.parse(user)
let email=users.email
let date=localStorage.getItem("date")
let price=localStorage.getItem("price")
const res=localStorage.getItem("cart")
let cart=JSON.parse(res)


let movies=[]
    for(var j=0;j<cart.length;j++){
      movies[j]=cart[j].name
    }



  return (
    <>
<div class="box">
  <div class='inner'>
  <h1>TICKET</h1>
  <div class='info clearfix'>
    <div class='wp'>Number of Seats<h1 key={seats}>{seats}</h1></div>
    <div class='wp'>Seats Selected<h1 >{movies.toString()}</h1></div>
    <div class='wp'>Movie Selected<h2>{movie}</h2></div>
    <div class='wp'>Date<h1>{date}</h1></div>
    <div class='wp'>Email<h1>{email}</h1></div>
  </div>
  <div class='total clearfix'>
    <h2>Total : <p>Rs/-{price} </p></h2>
  </div>
 
  </div>
  <div>
        <button onClick={() => window.print()}>PRINT</button>
        
      </div>
</div>

</>
);
}

export default Ticket;

