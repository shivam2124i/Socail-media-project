import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import colors from 'colors';

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email:email }) 
        if (user) {
            const validPass =await bcrypt.compare(password,user.password);
            if (validPass) {
                const token = jwt.sign({ email:email, password:user.password },
                    process.env.SECRET, { expiresIn: "1hr" ,});
                res.send({ token,user,userId:user._id,Email:user.email,msg:"Authenticated!" });
            } 
            else {
                res.status(401).send("Authentiction Failed")
            }

        } else {
            res.status(404).send("Email Not Found ! ")

        }

    } catch (error) {
        console.log(error);
    

    }
}

export const signup = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, gender, age, password ,profilePicture} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const toBeCreatedUser = new User({ firstname, lastname, email, phone, gender, age, password:hashPassword ,profilePicture});
        const user = await toBeCreatedUser.save()
        const token = jwt.sign({ email, hashPassword }, process.env.SECRET, { expiresIn: "1hr" });
        res.send({ user,userId:user._id, token,Email:user.email, msg: " User  Created " })
    } catch (error) {
        console.log(error);
    }
}




export const checkLogin=async(req,res)=>{
    try {
        const {token}=req.body;
        const verified = await jwt.verify(token,process.env.SECRET);
        res.send({msg:"verified"})
    } catch (error) {
        console.log(error);
        res.status(401).send({msg:"Signin again"})
    }
}


export const UpdateNewPassword = async (req,res)=>{
    try {
        const {password}=req.body
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        await User.findByIdAndUpdate(req.params.id,{password:hashPassword})
        res.send("password updated")
    } catch (error) {
        console.log(error);
    }
}