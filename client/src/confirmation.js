import React,{useState,useRef,useEffect} from 'react'
 
import './App.css'
import { useNavigate } from 'react-router-dom'
export default function Confirmation(){


  

const Ref = useRef(null);
const [timer, setTimer] = useState('00:00:00');

const getTimeRemaining = (e) => {
  const total = Date.parse(e) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / 1000 * 60 * 60) % 24);
  return {
      total, hours, minutes, seconds
  };
}

const startTimer = (e) => {
  let { total, hours, minutes, seconds } 
              = getTimeRemaining(e);
              
  if (total >= 0) {
      setTimer(
          (hours > 9 ? hours : '0' + hours) + ':' +
          (minutes > 9 ? minutes : '0' + minutes) + ':'
          + (seconds > 9 ? seconds : '0' + seconds)
      )

  }
  else{
    clearInterval(Ref.current);
    for (var i = 0; i < cart.length; i++) {
      const available= cart[i].id;
      const occupied=!cart[i].occupied
      const data={available,occupied}
      fetch(`http://127.0.0.1:5000/delete`,{
      method:"POST",
      headers:{
      'Content-Type':'application/json'
              },
      body:JSON.stringify(data)
  }).then(response => response.json())
  .catch(error => console.log(error))
}
localStorage.removeItem('cart');
localStorage.removeItem('price');
localStorage.removeItem("seats_wanted")
localStorage.removeItem("seatsSelected")
navigate("/main")
  }
}

const clearTimer = (e) => {
  setTimer('00:05:00');
  if (Ref.current) clearInterval(Ref.current);
  const id = setInterval(() => {
      startTimer(e);
  }, 1000)
  Ref.current = id;
}

const getDeadTime = () => {
  let deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + 60);
  return deadline;
}

useEffect(() => {
    clearTimer(getDeadTime());
},[]);

const navigate=useNavigate();
    const getDatafromLS=()=>{
        const data=localStorage.getItem("cart")
        if(data){
          return (JSON.parse(data))
        }else{
          return []
        }
      }
      const [cart] = useState(getDatafromLS())
      var  price=localStorage.getItem("price")

      var res=localStorage.getItem("user")
      const log=JSON.parse(res)

  function updateSeats(){
    let seats=[]
    for(var j=0;j<cart.length;j++){
      seats[j]=cart[j].name
    }
        for (var i = 0; i < cart.length; i++) {
        const id= cart[i].id;
        // console.log(id)
         const occupied=cart[i].occupied;
         const user=log.id
         const data={occupied,user}
          
      fetch(`http://127.0.0.1:5000/update/${id}`,{
      method:"POST",
     headers:{
      'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }).then(response => response.json())
    .catch(error => console.log(error))
  }

  const name=log.name
  const email=log.email
  const seat=seats.toString()
  const price1=price
  const order={name,email,seat,price1}
  fetch('http://127.0.0.1:5000/order',{
   method:"POST",
   headers:{
    'Content-Type':'application/json'
    },
    body:JSON.stringify(order)
  }).then(response => response.json())
  .catch(error => console.log(error))


  // localStorage.removeItem("cart")
  // localStorage.removeItem("price")
 
  // localStorage.removeItem("seatsSelected")
  localStorage.removeItem("seatsSelected")
  clearInterval(Ref.current);
  window.confirm("Seats Reserved Successfully")
//storing time 
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
localStorage.setItem("date",date)
  navigate("/ticket")
      }


      function deleteblock(){
        for (var i = 0; i < cart.length; i++) {
        const available= cart[i].id;
        const occupied=!cart[i].occupied
        const data={available,occupied}
        fetch(`http://127.0.0.1:5000/delete`,{
        method:"POST",
        headers:{
        'Content-Type':'application/json'
                },
        body:JSON.stringify(data)
    }).then(response => response.json())
    .catch(error => console.log(error))
  }
 
  clearInterval(Ref.current);
  navigate("/seats")
} 
    return(
        <div>
                <h1>Confirmation page</h1>
                <p>Time Remaining:{timer}</p>
                <div className="selects">
                <p>Selected seats:
                    </p>
                    {cart && cart.map((item)=><p className='select on'  key={item.id}  >{item.name}
                    </p>)}
                    </div>
                    <p >Total price:{price}$</p>
                    <button className='route' onClick={deleteblock}>Back</button>
                    <button className='submit' onClick={updateSeats} >Submit</button>
    </div>
    );
}