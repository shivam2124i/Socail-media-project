import mongoose from "mongoose";
import Colors from "colors";
export const connectDb = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        if (connect) {
            console.log("mongo Connected".red.underline.bold);
        } 
    } catch (error) {
        console.log(error);
    }
}




