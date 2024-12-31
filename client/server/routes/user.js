import express from "express";
import {
  acceptFriedRequest,
  deleteFriend,
  deleteUser,
  getAllUser,
  getUserById,
  removeFriendRequest,
  requestsReceived,
  removeDP,
  sendFriedRequest,
  updateUser,
  yourFriends,
  removeSendRequest,
  youSendRequeset,
  CheckPassword,
  SearchBar,
} from "../controllers/user.js";
import { authenticator } from "../middlewares/authenticator.js";
const userRouter = express.Router();

userRouter.get("/getAllUsers", authenticator, getAllUser);
userRouter.get("/getUserById/:_id", authenticator, getUserById);
userRouter.put("/updateUser/:_id", authenticator, updateUser);
userRouter.put("/sendRequest/:_id", authenticator, sendFriedRequest);
userRouter.put("/acceptRequest/:_id", authenticator, acceptFriedRequest);
userRouter.get("/getAllReceivedRequest", authenticator, requestsReceived);
userRouter.put("/removeRequest/:_id", authenticator, removeFriendRequest);
userRouter.get("/yourFriends", authenticator, yourFriends);
userRouter.put("/deleteFriend/:_id", authenticator, deleteFriend);
userRouter.put("/removeDP/:_id", authenticator,removeDP);
userRouter.get("/youSendRequeset",authenticator,youSendRequeset);
userRouter.post("/CheckPassword/:_id",authenticator,CheckPassword);
userRouter.delete("/deleteUser/:_id",authenticator, deleteUser);
userRouter.put("/removeSendRequest/:_id", authenticator, removeSendRequest);
userRouter.get("/SearchBar",SearchBar);
export default userRouter;
