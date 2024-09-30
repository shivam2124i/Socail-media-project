import colors from 'colors';
import Post from '../models/post.js';
import Comment from '../models/comment.js';
import User from '../models/user.js';


async function commentFormatter(comments){
    if(comments==undefined || comments.length==0)
        return [];

    let returnObj=[];

    for await(let item of comments){
        let comment=await Comment.findById(item);
        returnObj.push(comment);
    }

    return returnObj;
}





export const getposts = async (req,res) =>{
    try {
        const posts = await Post.find();
        res.send({posts,msg:"All Posts"})
    } catch (error) {
        console.log(error);
    }
}

export const createPosts = async (req,res)=>{
    try {
        const {id}=req.user;
        const {title,image,caption,tags}=req.body
        const bold = new Post({title,image,caption,tags,creator:id });
        const createdPosts = await bold.save();
        await User.updateOne(
            { _id:id}, 
            { $push: { posts: createdPosts._id } }
          );
        res.send({createdPosts,msg:"Created Post"})
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = async (req,res)=>{
    try {
      const updatedPost = await Post.findOneAndUpdate({
        _id:req.params._id,
        creator:req.user.id
      },req.body)
      res.send({updatedPost,msg:"Post Updated"})  
    } catch (error) {
        console.log(error);
    }
}


export const deletePost = async(req,res)=>{
    try {
        await Post.findOneAndDelete({
            _id:req.params._id,
            creator:req.user.id
        })
        res.send({msg:"Post Deleted"})
    } catch (error) {
        console.log(error);
    }
}



export const getPostById = async(req,res)=>{
    try {
        const post  =await Post.findOne({
            _id:req.params._id
        })
            const comments=await commentFormatter(post?.comments);
            post.comments=comments;
        res.send({post,comments,msg:"post"})
    } catch (error) {
        console.log(error);
    }
}



export const likePost=async(req,res)=>{
    try {
        // const {_id}=req.body;
        // const post = req.params._id;
        // const query= await Post.findById({_id:post});;
        // console.log(query);
        // if(_id!==query._id){
        //     const likedBy=req.user.id;
        //     await Post.updateOne({ _id: req.params._id }, { $push: { likes: likedBy } });
        // }else{
            
        //     const data = await Post.updateOne(
        //         { _id: post },
        //         { $pull: { likes:_id } }
        //     );
        //     res.send("Liked");
        // }
        const likedBy=req.user.id;
        await Post.updateOne({ _id: req.params._id }, { $push: { likes: likedBy } });
        res.send("Liked");
    } catch (error) {
        console.log(error);
    }
}

export const addComments=async(req,res)=>{
    try {
        const text=req.body.text;
        const creator=req.user.id;
        const raw=new Comment({text,creator});
        const addedComment=await raw.save();
        await Post.updateOne({ _id: req.params._id }, 
            { $push: { comments:`${addedComment._id}` } });
            await User.updateOne(
                { _id:creator}, 
                { $push: { comment: `${addedComment._id}` } }
              );
        res.send("Comment Added")
    } catch (error) {
      console.log(error);  
    }
}   


export const removeLike =async(req,res)=>{
    try {
        const {_id}=req.body;
        const post = req.params._id
           
    console.log(data);
    
        // const likeRemove = await Post.updateOne({ _id: req.params._id }, { $pull: { likes: likedBy } });
        // res.send("Removed Like");
        // console.log(likeRemove);
        
    } catch (error) {
        console.log(error);
        
    }
}

 
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