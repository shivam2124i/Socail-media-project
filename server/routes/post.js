import express from 'express';
import { addComments, createPosts, deletePost,  getPostById, removeLike, getposts, likePost, updatePost } from '../controllers/post.js';
import { authenticator } from '../middlewares/authenticator.js';

const postRouter = express.Router();

postRouter.get("/getPosts", authenticator,getposts);
postRouter.post("/createPost",authenticator, createPosts);
postRouter.put("/updatePost/:_id", authenticator, updatePost);
postRouter.delete("/deletePost/:_id", authenticator, deletePost);
postRouter.get("/getPostById/:_id",authenticator,getPostById);
postRouter.put("/likePost/:_id",authenticator,likePost);
postRouter.put("/addComment/:_id",authenticator,addComments);
postRouter.put("/removeLike/:_id",removeLike)
// postRouter.get("/findCreatorInComment",findCreatorInComment);

export default postRouter; 