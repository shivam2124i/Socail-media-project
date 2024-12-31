import User from "../models/user.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

async function requestFormatter(reqArray) {
  let user = [];
  for await (let id of reqArray) {
    const returnValue = await retriveUser(id);
    user.push(returnValue);
  }
  // console.log(user);
  return user;
}

async function retriveUser(id) {
  try {
    const query = User.findById(id);
    query.select(
      "_id firstname lastname profilePicture friends requestSent requestsReceived comment"
    );
    const user = await query.exec();
    return user;
  } catch (error) {
    console.log(error);
  }
}

export const getAllUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const query = User.find({
      $and: [
        {
          _id: {
            $not: { $eq: req.user.id },
          },
        },
        {
          _id: {
            $nin: user.friends,
          },
        },
        {
          _id: {
            $nin: user.requestSent,
          },
        },
        {
          _id: {
            $nin: user.requestsReceived,
          },
        },
      ],
    });
    query.select("_id firstname lastname profilePicture");
    const users = await query.exec();
    res.send({ users, msg: "All Users" });
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    // const { _id } = req.params;
    // console.log(req.params);

    const query = User.findOne({
      _id: req.params._id,
    });
    query.select(
      "firstname lastname gender age phone email profilePicture friends  requestSent"
    );
    const user = await query.exec();
    // console.log(user);
    res.send({ user, msg: "User Data By Id" });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findByIdAndUpdate(_id, req.body);
    res.send("Updated User");
  } catch (error) {
    console.log(error);
  }
};

export const yourFriends = async (req, res) => {
  try {
    const id = req.user.id;
    const query = User.findOne({ _id: id });
    query.select("friends");
    const user = await query.exec();
    // console.log(user, "user");
    const friends = await requestFormatter(user.friends);
    res.send({ friends, msg: "All friends" });
  } catch (error) {
    console.log(error);
  }
};

export const youSendRequeset = async (req, res) => {
  try {
    const { id } = req.body;
    const query = User.find({ _id: id });
    query.select("requestSent");
    const user = await query.exec();
    const requestSent = await requestFormatter(user.requestSent);
    res.send({ requestSent, msg: "All requset sends" });
  } catch (error) {
    console.log(error);
  }
};

export const sendFriedRequest = async (req, res) => {
  try {
    const sender = req.user.id;
    const reciever = req.params._id;

    await User.updateOne({ _id: sender }, { $push: { requestSent: reciever } });

    await User.updateOne(
      { _id: reciever },
      { $push: { requestsReceived: sender } }
    );

    res.send("request send");
    // console.log("request send");
  } catch (error) {
    console.log(error);
  }
};

export const acceptFriedRequest = async (req, res) => {
  try {
    const acceptingPerson = req.user.id;
    const sender = req.params._id;
    const acceptingUser = await User.findOne({ _id: acceptingPerson });
    const senderUser = await User.findOne({ _id: sender });
    // console.log(acceptingUser, "acceptor");
    // console.log(senderUser, "sender");

    await User.updateOne(
      { _id: acceptingPerson },
      { $push: { friends: sender } }
    );
    await User.updateOne(
      { _id: sender },
      { $push: { friends: acceptingPerson } }
    );

    const updatedAcceptor = acceptingUser.requestsReceived.filter((ele) => {
      if (ele != sender) return ele;
    });
    const updatedSender = senderUser.requestSent.filter((ele) => {
      if (ele != acceptingPerson) {
        return ele;
      }
    });
    // console.log(updatedAcceptor, "acceptor");
    // console.log(updatedSender, "sender");
    await User.findByIdAndUpdate(
      { _id: acceptingPerson },
      { requestsReceived: updatedAcceptor }
    );
    await User.findByIdAndUpdate(
      { _id: sender },
      { requestSent: updatedSender }
    );

    res.send("request accept");
  } catch (error) {
    console.log(error);
  }
};

export const requestsReceived = async (req, res) => {
  try {
    const id = req.user.id;
    const query = User.findOne({ _id: id });
    query.select("requestsReceived");
    const user = await query.exec();
    // console.log(user, "user");
    const requestsReceived = await requestFormatter(user.requestsReceived);
    res.send({ requestsReceived, msg: "All request recevied" });
  } catch (error) {
    console.log(error);
  }
};

export const removeSendRequest = async (req, res) => {
  try {
    const sender = req.user.id;
    const reciever = req.params._id;
    await User.updateOne({ _id: sender }, { $pull: { requestSent: reciever } });
    await User.updateOne(
      { _id: reciever },
      { $pull: { requestsReceived: sender } }
    );
    res.send({ msg: "ho gaya" });
  } catch (error) {
    console.log(error);
  }
};

export const removeFriendRequest = async (req, res) => {
  try {
    const removingPerson = req.user.id;
    const sender = req.params._id;
    const removingUser = await User.findOne({ _id: removingPerson });
    const senderUser = await User.findOne({ _id: sender });

    const updateRemover = removingUser.requestsReceived.filter((ele) => {
      if (ele != sender) {
        return ele;
      }
    });
    const updatedSender = senderUser.requestSent.filter((ele) => {
      if (ele != removingPerson) {
        return ele;
      }
    });

    await User.findOneAndUpdate(
      { _id: removingPerson },
      { requestsReceived: updateRemover }
    );
    await User.findOneAndUpdate(
      { _id: sender },
      { requestSent: updatedSender }
    );

    res.send("Request Removed");
  } catch (error) {
    console.log(error);
  }
};

export const deleteFriend = async (req, res) => {
  try {
    const deletingPerson = req.user.id;
    const user = req.params._id;
    await User.updateOne({ _id: deletingPerson }, { $pull: { friends: user } });
    await User.updateOne({ _id: user }, { $pull: { friends: deletingPerson } });
    res.send("delete Friend");
  } catch (error) {
    console.log(error);
  }
};

// ---------------------------------------------------------------------------------------------------------Delete User------------------------------------------------

export const deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const AllUser = await User.find();
    const user = await User.findOne({
      _id: _id,
    });
    console.log(user);
    

    const post = await Post.find();
    const { posts } = user;
    const { comment } = user;
    // console.log(comment,"comments");
    
    // -----------------------------------------------------------------------------------
    const deleteCommentFromPost = Post.find({ _id: { $in: posts } });
    deleteCommentFromPost.select("comments");
    const postComments = await deleteCommentFromPost.exec();
    console.log(postComments, "user");

    for await (let post of postComments) {
      const deleteUsersComments = await Comment.deleteMany({
        _id: { $in: post.comments },
      });
      console.log(deleteUsersComments);
    }

    for await (let user of postComments){
       const updateuser = await User.updateMany({
      $pull: { comment: { $in: user.comments } },
    });
    console.log(updateuser);
    }

    // ---------------------------------------------------------------------------------
    
    const query = User.findOne({ _id: _id });
    query.select("friends");
    const user1 = await query.exec();
    const friends = await requestFormatter(user1.friends);

    const query2 = User.findOne({ _id: _id });
    query2.select("requestSent");
    const user2 = await query2.exec();
    const requestSent = await requestFormatter(user2.requestSent);

    const queryRequestReceived = User.findOne({ _id: _id });
    queryRequestReceived.select("requestsReceived");
    const user3 = await queryRequestReceived.exec();
    const requestsReceived = await requestFormatter(user3.requestsReceived);

    await User.findByIdAndDelete({
      _id: _id,
    });

    const removePost = await Post.deleteMany({
      _id: { $in: posts },
    });

    const deleteComments = await Comment.deleteMany({
      _id: { $in: comment },
    });

    const data = await Post.updateMany(
      { _id: post },
      { $pull: { likes: _id } }
    );

    const user8 = comment.filter(check);

    function check(comment) {
      return comment;
    }

    const commentsRemove = await Post.updateMany({
      $pull: { comments: { $in: user8 } },
    });

    const deleteFriends = await User.updateMany(
      { _id: friends },
      { $pull: { friends: _id } }
    );
    const removeSendRequest = await User.updateMany(
      { _id: requestSent },
      { $pull: { requestsReceived: _id } }
    );
    const reqmoveReceiveRequest = await User.updateMany(
      { _id: requestsReceived },
      { $pull: { requestSent: _id } }
    );

    console.log("hoo gaya");
    res.send("ho gaya");
  } catch (error) {
    console.log(error);
  }
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------

export const findUserByEmail = async (req, res) => {
  try {
    const query = User.findOne({
      email: req.body.email,
    });
    query.select("firstname lastname email _id");
    const user = await query.exec();
    res.send({ user, msg: "msg" });
  } catch (error) {
    console.log(error);
  }
};

export const generateOtp = async (req, res) => {
  try {
    const otp = Math.ceil(
      10 ** 4 * Math.random() +
        10 ** 3 * Math.random() +
        10 ** 2 * Math.random() +
        10 ** 1 * Math.random()
    );
    if (otp <= 999) {
      const OTP = otp + 1000;
      return OTP;
    }
    if (otp >= 10000) {
      const OTP = otp - 1000;
      return OTP;
    }
    console.log(otp);
    await User.findByIdAndUpdate(req.body._id, {
      otp: otp,
    });
    console.log(req.body, "body");

    const user = await User.findOne({ _id: req.body._id });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    console.log(user);

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "OTP Verification",
      text: `Your OTP for verification is ${otp}`,
    });
    res.send("Generated");
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body._id,
    });
    if (user.otp == req.body.otp) res.send({ verified: true, msg: "Verified" });
    else res.send({ verified: false, msg: "Enter otp Again" });
  } catch (error) {
    console.log(error);
  }
};

export const removeDP = async (req, res) => {
  let empty = "";
  try {
    const removingPerson = req.params;
    await User.updateOne(
      { _id: removingPerson },
      { $set: { profilePicture: empty } }
    );
    res.send("removed DP");
  } catch (error) {
    console.log(error);
  }
};

export const generateOtpForSignup = async (req, res) => {
  try {
    const otp = Math.ceil(10**4*Math.random()+10**3*Math.random()+10**2*Math.random()+10**1*Math.random())
    if(otp<=999){
      const OTP =otp+1000
      return OTP;
    }
    if(otp>=10000){
      const OTP = otp-1000
      return OTP;
    }
    console.log(otp);
    await User.findByIdAndUpdate(req.body._id,{
      otp:otp
    })
    const user = req.body;
    // const user = await User.findOne({_id:req.body._id})
      const transporter=nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
      }
    })

    await transporter.sendMail({
      from:process.env.EMAIL,
      to: user.email,
      subject:"OTP Verification",
      text:`Your OTP for verification is ${otp}`
    });
    res.send("Generated");
  } catch (error) {
    console.log(error);
  }
};

export const CheckPassword = async (req, res) => {
  try {
    const { _id } = req.params;
    const { password } = req.body;
    const user = await User.findOne({ _id: _id });
    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        res.send({ user, msg: "Password Matched" });
      } else {
        res.status(401).send("Password Do Not Matched");
      }
    }
  } catch (error) {
    console.log(error);
  }
};


export const SearchBar = async (req, res) => {
  try {

    // const name1 = req.body;
    // for await (let post of name1) {
    //   const deleteUsersComments = await User.find({
    //     firstname: { $eq: post.firstname },
    //   });
    //   console.log(deleteUsersComments);
    // }

    // console.log(name1);
    
   const AllUser = await User.find();
   console.log(AllUser);
   

   
   
  //  const picked = AllUser.find( User.firstname == name1);
  //  var output = AllUser.filter(function(value){ return value.firstname==name1;})
  //  console.log(output);
   
  //  console.log(AllUser);
   


  } catch (error) {
    console.log(error);
  }
};
