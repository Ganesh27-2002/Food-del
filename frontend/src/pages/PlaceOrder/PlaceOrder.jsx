import { useContext, useEffect, useState } from "react"
import "./PlaceOrder.css"
import { useNavigate } from "react-router-dom"

import { StoreContext } from "../../context/StoreContext"
import axios from "axios";
const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext);
  const [data,setdata]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    phone:"",
    country:""

  });

  const placeOrder=async (event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount(),
    }
    let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success){
      const {session_url}=response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
    
  }
  const navigate=useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart');
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart');
    }
  },[token])
  const onchangehandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setdata((data)=>({...data,[name]:value}));

  }
  
  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
          <p className="title">
            Delivery Information
          </p>
          <div className="multi-fields">
            <input required name="firstName" value={data.firstName} onChange={onchangehandler} type="text" placeholder="First Name"/>
            <input required type="text" placeholder="Last Name" value={data.lastName} name="lastName" onChange={onchangehandler}/>
          </div>
          <input required value={data.email} name="email" onChange={onchangehandler} type="email" placeholder="Email Address"/>
          <input required value={data.street} name="street" onChange={onchangehandler} type="text" placeholder="Street"/>
          <div className="multi-fields">
            <input required value={data.city} name="city" onChange={onchangehandler} type="text" placeholder="City Name"/>
            <input required type="text" placeholder="State" value={data.state} name="state" onChange={onchangehandler} />
          </div>
          <div className="multi-fields">
            <input required type="text" value={data.zipcode} name="zipcode" onChange={onchangehandler} placeholder="Zip Code"/>
            <input required type="text" placeholder="Country" value={data.country} name="country" onChange={onchangehandler} />
          </div>
          <input required type="text" placeholder="Phone" value={data.phone} name="phone" onChange={onchangehandler}/>
          
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
            
          </div>
          <button type="submit">Proceed To Payment</button> 
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
