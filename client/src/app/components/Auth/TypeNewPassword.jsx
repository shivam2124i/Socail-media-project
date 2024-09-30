import { AuthContext } from "@/app/Context/AuthContext";
import { useRouter } from "next/navigation";

import React, { useContext, useState } from "react";

export const TypeNewPassword = (id) => {
  console.log(id);
  const [passwordStruc,setPasswordStruc]=useState({newPassWord:"",confirmNewPassWord:""})
  const {forgotPassword}=useContext(AuthContext);
  const router = useRouter()
  async function ForgotPassword(){
    try {
      if(passwordStruc.newPassWord!="" && passwordStruc.confirmNewPassWord!=""){
        if(passwordStruc.newPassWord==passwordStruc.confirmNewPassWord){
          const status =await forgotPassword(id.id,{password:passwordStruc.newPassWord})
          if(status==200){
            router.push("/Auth")
          }
        }else{
          alert("Passwords Do Not Match")
        }
      }else{
        alert("Fileds Cannot Be Empty")
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <br />
      <label>New Pssword</label>
      <input
        type="password"
        className="form-control"
        placeholder="New Pssword"
        onChange={(e)=>{
          setPasswordStruc(prev=>{
            return{...prev,newPassWord:e.target.value}
          })
        }}
      />
      <br />
      <label>Confirm Password</label>
      <input
        type="password"
        className="form-control"
        placeholder="Confirm Password"
        onChange={(e)=>{
          setPasswordStruc(prev=>{
            return{...prev,confirmNewPassWord:e.target.value}
          })
        }}
      />
      <br />
      <button className="btn btn-outline-warning" onClick={()=>{
        ForgotPassword();
      }}>submit</button>
    </div>
  );
};
