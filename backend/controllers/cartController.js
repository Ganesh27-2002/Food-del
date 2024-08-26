import userModel from "../models/userModel.js"


//add Items to user cart
const addToCart=async (req,res)=>{
    try {
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData =await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;

        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to the cart"})
    } catch (error) {
        res.json({succes:false,message:"Error in adding to cart"});
    }
}

//remove items from user cart
const removeFromCart=async (req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData =await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;

        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from the cart"})


    } catch (error) {
        console.log(error);
        res.json({succes:false,message:"Error in removing from cart"});
    }
}

//fetch user cart data
const getCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        res.json({success:true,message:"Cart data fetched",cartData})

    } catch (error) {
        console.log(error);
        res.json({succes:false,message:"Error in fetching cart data"});
    }
}
export {addToCart,removeFromCart,getCart};