import {  useContext, useState } from "react"
import "./LoginPopup.css"
import axios from "axios"
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
const LoginPopup = ({setshowlogin}) => {
    const [currstate, setCurrState] = useState("Login");
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    });
    const {url,setToken}=useContext(StoreContext);
    const onchangehandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }
   const onLogin=async(event)=>{
        event.preventDefault();
        let newUrl=url;
        if(currstate==="Login"){
            newUrl+="/api/user/login";
        }else{
            newUrl+="/api/user/register";
        }
        const response = await axios.post(newUrl,data);
        if(response.data.success){
            // console.log("success")
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setshowlogin(false);
        }else{
            alert(response.data.message);
        }

   }
  return (
    <div className="login-popup">
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currstate}</h2>
                <img onClick={()=>setshowlogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currstate==="Login"?<></>:<input name="name" value={data.name} onChange={onchangehandler} type="text" placeholder="Your Name" required/>}
                
                <input name="email" value={data.email} onChange={onchangehandler} type="email" placeholder="Email Address" required/>
                <input name="password" onChange={onchangehandler} value={data.password} type="password" placeholder="Password" required/>

            </div>
            <button type="submit">{currstate==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By Continuing, I Agree to the terms of use & Privacy Policy.</p>
            </div>
            {
                currstate==="Login"?<p>Create A new Account?<span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>:
                                    <p>Already have an Account?<span onClick={()=>setCurrState("Login")}>Login Here</span></p>
            }
            
            
        </form>
    </div>
  )
}

export default LoginPopup
