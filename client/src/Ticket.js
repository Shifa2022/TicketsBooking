import React from 'react'
import './ticket.css'
 function Ticket() {

 let seats=localStorage.getItem("seats_wanted")
 let movie=localStorage.getItem("moviename")
 let user=localStorage.getItem("user")
 var users=JSON.parse(user)
let email=users.email
let date=localStorage.getItem("date")
let price=localStorage.getItem("price")

  return (
    <>
<div class="box">
  <div class='inner'>
  <h1>TICKET</h1>
  <div class='info clearfix'>
    <div class='wp'>Seats<h1 key={seats}>{seats}</h1></div>
    <div class='wp'>Movie<h2>{movie}</h2></div>
    <div class='wp'>Date<h3>{date}</h3></div>
    <div class='wp'>Email<h4>{email}</h4></div>
  </div>
  <div class='total clearfix'>
    <h2>Total : <p>{price} Rs/-</p></h2>
  </div>
  </div>
</div>
</>
);
}

export default Ticket;

