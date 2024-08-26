// import { useState } from "react"
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { StoreContext } from "../../context/StoreContext";
import './verify.css'
import axios from "axios";
const Verify = () => {
  const [searchparams,setsearchparasms]=useSearchParams();
  const success=searchparams.get("success");
  const orderId=searchparams.get("orderId")
  const {url}=useContext(StoreContext);
  const navigate=useNavigate();

  const verifyPayment=async ()=>{
    const response=await axios.post(url+"/api/order/verify",{success,orderId});
    if(response.data.success){
        navigate("/myorders");
        // console.log("sss")
    }else{
      navigate("/");
    }
  }

  useEffect(()=>{
    verifyPayment();
  },[])
  // console.log(success,orderId)
  return (
    <div className="verify">
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify
