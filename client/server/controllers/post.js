import colors from "colors";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import User from "../models/user.js";
import { query } from "express";

async function commentFormatter(comments) {
  if (comments == undefined || comments.length == 0) return [];

  let returnObj = [];

  for await (let item of comments) {
    let comment = await Comment.findById(item);
    returnObj.push(comment);
  }

  return returnObj;
}

export const getposts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send({ posts, msg: "All Posts" });
  } catch (error) {
    console.log(error);
  }
};

export const createPosts = async (req, res) => {
  try {
    const { id } = req.user;
    const { title, image, caption, tags } = req.body;
    const bold = new Post({ title, image, caption, tags, creator: id });
    const createdPosts = await bold.save();
    await User.updateOne({ _id: id }, { $push: { posts: `${createdPosts._id}` } });
    res.send({ createdPosts, msg: "Created Post" });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      {
        _id: req.params._id,
        creator: req.user.id,
      },
      req.body
    );
    res.send({ updatedPost, msg: "Post Updated" });
  } catch (error) {
    console.log(error);
  }
};
// ---------------------------------------------------------------------------------------------
export const deletePost = async (req, res) => {
  try {

    const user = req.user.id;
    console.log(user);
    
    const PostId = req.params._id;

    const post = await Post.findOne({
      _id:PostId
    });
    
    const {comments} = post;
    const deleteCommentByPostID  = await Comment.deleteMany({
      _id:{$in:comments}
    });
      const updateuser = await User.updateMany({
        $pull: { comment: { $in:comments } },
      });

      const removepostIDfromUser = await User.updateOne(
        {_id:user},{$pull:{posts:PostId}}
      )
      await Post.findOneAndDelete({
        _id:PostId,
        creator: user,
      });
    res.send({ msg: "Post Deleted" });
  } catch (error) {
    console.log(error);
  }
};
// ----------------------------------------------------------------------------------------------------
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({ 
      _id: req.params._id,
    });
    const comments = await commentFormatter(post?.comments);
    post.comments = comments; 
    res.send({ post, comments, msg: "post" });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const likedBy = req.user.id;
    await Post.updateOne(
      { _id: req.params._id },
      { $push: { likes: likedBy } }
    );
    res.send("Liked");
  } catch (error) {
    console.log(error);
  }
};

export const addComments = async (req, res) => {
  try {
    const text = req.body.text;
    const creator = req.user.id;
    const raw = new Comment({ text, creator });
    const addedComment = await raw.save();
    await Post.updateOne(
      { _id: req.params._id },
      { $push: { comments: `${addedComment._id}` } }
    );
    await User.updateOne(
      { _id: creator },
      { $push: { comment: `${addedComment._id}` } }
    );
    res.send("Comment Added");
  } catch (error) {
    console.log(error);
  }
};

export const removeLike = async (req, res) => {
  try {
    const likedBy = req.user.id;
    console.log(likedBy);

    // const post = req.params._id

    const likeRemove = await Post.updateOne(
      { _id: req.params._id },
      { $pull: { likes: likedBy } }
    );
    res.send("Removed Like");
    console.log(likeRemove);
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const creator = req.query.userId;
    const post = req.query.postId;
    const commentID =req.query.commentId;
    console.log(creator);
    
    console.log(req.query);
    

    const commentDelete = await Comment.findOneAndDelete({
      _id: commentID,
      creator,
    });

    const posts = await Post.findOne({
      _id: post,
    });
    

    const user = await User.findOne({ 
      _id: creator,
    });

    const { comments } = posts;
    // console.log(comments);
    
    const { comment } = user;

    const Postdata = await Post.updateOne(
      { _id: post },
      { $pull: { comments:commentID } }
    );
    console.log(Postdata);
     
    const Userdata = await User.updateMany(
      { _id: creator },
      { $pull: { comment: commentID } }
    );
    res.send("ho gaya");
  } catch (error) {
    console.log(error);
  }
};

// export const findCreatorInComment= async(req,res)=>{
//     try {
//         const query = Comment.find({
//             creator: req.body._id,
//           });
//           query.select("firstname lastname profilePicture");
//           const user = await query.exec();
//           res.send({ user, msg: "msg" });
//     } catch (error) {
//         console.log(error);

//     }
// }
