import mongoose from "mongoose";

export const connectDB =async()=>{
    await mongoose.connect('mongodb+srv://ganeshvaddepelli16:D20i7jQ1daq4Iu6I@cluster0.qr5dg6u.mongodb.net/food-del').then(()=>{
        console.log("Database is connected")
    })
}