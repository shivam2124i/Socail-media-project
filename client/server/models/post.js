import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    caption:{
        type:String
    },
    tags:{
        type:Array
    },
    creator:{
        type:String
    },
    comments:{
        type:Array,
            default:[]
    },
    likes:{
        type:Array,
        default:[]
    }
})


const Post = mongoose.model("Post",postSchema)

export default Post;