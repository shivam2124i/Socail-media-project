import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String
    },
    friends:{
        type:Array,
        default:[]
    },
    requestsReceived:{
        type:Array,
        default:[]
    },
    requestSent:{
        type:Array,
        default:[]
    },
    posts:{
        type:Array,
        default:[]
    },
    comment:{
        type:Array,
        default:[]
    },
    otp:{
        type:String
    }
});


const  User = mongoose.model("User",UserSchema)


export default User;